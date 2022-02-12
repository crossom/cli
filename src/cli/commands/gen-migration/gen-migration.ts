/* eslint-disable @typescript-eslint/naming-convention */

import { loadEntities, Logger } from "@techmmunity/symbiosis";
import { cleanObj, getRootPath, isEmptyObject } from "@techmmunity/utils";
import { existsSync, writeFileSync } from "fs";

import { MigrationHandler } from "../../../lib/migration-handler";

import { getColType } from "./helpers/get-col-type";

import { getConfigFile } from "../../utils/get-config-file";
import { getMigrationsPath } from "../../utils/get-migrations-path";
import { getSymbVersion } from "../../utils/get-symb-version";
import { getTemplate } from "../../utils/get-template";

import type { Plugin } from "../types/plugin";

export const genMigrations = async () => {
	const migrationsPath = getMigrationsPath();

	const { connectionConfig, plugin, entitiesDir } = getConfigFile();

	const pluginPath = getRootPath(`node_modules/${plugin}`);

	if (!existsSync(pluginPath)) {
		Logger.cliError(`Plugin not found: ${plugin}`);

		process.exit(1);
	}

	const { Connection } = require(pluginPath) as Plugin;

	const entities = await loadEntities(entitiesDir);

	const connection = new Connection({
		...connectionConfig,
		entities,
	});

	const template = getTemplate("migration:generate");
	const symbVersion = getSymbVersion();

	entities.forEach(entity => {
		const entityMetadata = connection.entityManager.getEntityMetadata(entity);

		const migration = new MigrationHandler();

		/**
		 * Entity
		 */

		migration.createEntity({
			databaseName: entityMetadata.databaseName,
			extras: entityMetadata.extras,
		});

		/**
		 * Enums
		 */

		entityMetadata.columns
			.filter(col => Boolean(col.enumValues))
			.forEach(col => {
				migration.createEnum({
					entityDatabaseName: entityMetadata.databaseName,
					columnDatabaseName: col.databaseName,
					enumName: col.enumName!,
					enumValues: col.enumValues!,
					extras: col.extras,
				});
			});

		/**
		 * Columns
		 */

		entityMetadata.columns.forEach(col => {
			const type = getColType(col);

			migration.createColumn({
				entityDatabaseName: entityMetadata.databaseName,
				columnDatabaseName: col.databaseName,
				enumName: col.enumName,
				primary: col.primary,
				comment: col.comment,
				extras: col.extras,
				type,
			});
		});

		/**
		 * Indexes
		 */

		entityMetadata.indexes?.forEach(idx => {
			const columnsDatabaseNames = connection.entityManager.convertColumnsNames(
				{
					entity,
					columnsNames: idx.columns.map(col => col.name),
				},
			);

			const extras = cleanObj(
				Object.fromEntries(idx.columns.map(col => [col.name, col.extras])),
			);

			migration.createIndex({
				entityDatabaseName: entityMetadata.databaseName,
				indexDatabaseName: idx.databaseName,
				columnsDatabaseNames,
				extras: isEmptyObject(extras) ? undefined : extras,
			});
		});

		const code = `${Date.now()}-${entityMetadata.name}`;

		const { up, down } = migration.genMigration();

		const formattedTemplate = template
			.replace(/\$\{CODE\}/g, code)
			.replace(/\$\{DESCRIPTION\}/g, `${entityMetadata.name} Migration`)
			.replace(/\$\{PLUGIN\}/g, plugin)
			.replace(/\$\{SYMB_VERSION\}/g, symbVersion)
			.replace(/\$\{MIGRATION_UP_LOGIC\}/g, up)
			.replace(/\$\{MIGRATION_DOWN_LOGIC\}/g, down);

		writeFileSync(`${migrationsPath}/${code}.ts`, formattedTemplate);
	});
};
