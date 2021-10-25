/* eslint-disable @typescript-eslint/naming-convention */

import { existsSync, readdirSync } from "fs";
import { BaseConnection, BaseConnectionOptions } from "@techmmunity/symbiosis";
import { isEmptyArray } from "@techmmunity/utils";

import { getConfigFile } from "../utils/get-config-file";
import { getRootPath } from "../utils/get-root-path";
import { Logger } from "../../utils/logger";

import { SyncManager as SyncManagerType } from "../../lib/sync-manager";
import { QueryRunner as QueryRunnerType } from "../../lib/query-runner";
import { getMigrationsPath } from "../utils/get-migrations-path";

interface Plugin {
	Connection: {
		new (connectionConfig: BaseConnectionOptions): BaseConnection;
	};
	QueryRunner: {
		new (connection: any): QueryRunnerType;
	};
	SyncManager: {
		new (connection: any): SyncManagerType;
	};
}

interface MigrationFile {
	Migration: {
		new (): {
			up: (queryRunner: QueryRunnerType) => Promise<void>;
			down: (queryRunner: QueryRunnerType) => Promise<void>;
		};
	};
}

export const runMigrations = async () => {
	const migrationsPath = getMigrationsPath();

	const { connectionConfig, plugin } = getConfigFile();

	if (!existsSync(getRootPath(`node_modules/${plugin}`))) {
		Logger.error(`Plugin not found: ${plugin}`);

		process.exit(1);
	}

	const { Connection, QueryRunner, SyncManager } = require(plugin) as Plugin;

	const connection = new Connection(connectionConfig);

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
