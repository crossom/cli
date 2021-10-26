/* eslint-disable @typescript-eslint/naming-convention */

import { existsSync, writeFileSync } from "fs";

import { getConfigFile } from "../utils/get-config-file";
import { getRootPath } from "../utils/get-root-path";
import { Logger } from "../../utils/logger";

import { getMigrationsPath } from "../utils/get-migrations-path";
import { MigrationGenerator } from "../../lib/migration-generator";
import { Plugin } from "./types/plugin";
import { getTemplate } from "../utils/get-template";
import { getSymbVersion } from "../utils/get-symb-version";

export const genMigrations = () => {
	const migrationsPath = getMigrationsPath();

	const { connectionConfig, plugin } = getConfigFile();

	if (!existsSync(getRootPath(`node_modules/${plugin}`))) {
		Logger.error(`Plugin not found: ${plugin}`);

		process.exit(1);
	}

	const { Connection } = require(plugin) as Plugin;

	const connection = new Connection(connectionConfig);

	const template = getTemplate("migration:generate");
	const symbVersion = getSymbVersion();

	connectionConfig.entities.forEach(entity => {
		const entityMetadata = connection.entityManager.getEntityMetadata(entity);

		const migration = new MigrationGenerator();

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
			migration.createColumn({
				entityDatabaseName: entityMetadata.databaseName,
				columnDatabaseName: col.databaseName,
				enumName: col.enumName,
				primary: col.primary,
				comment: col.comment,
				type: col.databaseType,
				extras: col.extras,
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

			const extras = Object.fromEntries(
				idx.columns.map(col => [col.name, col.extras]),
			);

			migration.createIndex({
				entityDatabaseName: entityMetadata.databaseName,
				indexDatabaseName: idx.databaseName,
				columnsDatabaseNames,
				extras,
			});
		});

		const code = `${Date.now()}-${entityMetadata.name}`;

		const { up, down } = migration.format();

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
