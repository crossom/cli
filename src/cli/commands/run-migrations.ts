/* eslint-disable @typescript-eslint/naming-convention */

import { readdirSync } from "fs";
import { isEmptyArray } from "@techmmunity/utils";

import { getConfigFile } from "../utils/get-config-file";
import { Logger } from "../../utils/logger";

import { BaseQueryRunner } from "../../lib/query-runner";
import { getMigrationsPath } from "../utils/get-migrations-path";
import { Plugin } from "./types/plugin";
import { loadEntities } from "../utils/load-entities";
import { isPackageInstalled } from "../utils/package-installed";

interface MigrationFile {
	Migration: {
		new (): {
			up: (queryRunner: BaseQueryRunner) => Promise<void>;
			down: (queryRunner: BaseQueryRunner) => Promise<void>;
		};
	};
}

export const runMigrations = async () => {
	const migrationsPath = getMigrationsPath();

	const { connectionConfig, plugin, entitiesDir } = getConfigFile();

	if (!isPackageInstalled(plugin)) {
		Logger.error(`Plugin not found: ${plugin}`);

		process.exit(1);
	}

	const { Connection, QueryRunner, SyncManager } = require(plugin) as Plugin;

	const entities = await loadEntities(entitiesDir);

	const connection = new Connection({
		...connectionConfig,
		entities,
	});

	await connection.connect();

	const migrations = readdirSync(migrationsPath);

	const syncManager = new SyncManager(connection);
	const executedMigrations = await syncManager.getExecutedMigrations();

	const notExecutedMigrations = migrations.filter(
		migration => !executedMigrations.includes(migration),
	);

	if (isEmptyArray(notExecutedMigrations)) {
		Logger.log("Everything is already synced.");

		process.exit(0);
	}

	const queryRunner = new QueryRunner(connection);

	for (const migrationFileName of notExecutedMigrations) {
		const { Migration } =
			require(`${migrationsPath}/${migrationFileName}`) as MigrationFile;

		const migration = new Migration();

		try {
			migration.up(queryRunner);
		} catch (err: any) {
			migration.down(queryRunner).catch();
		}
	}
};
