import type { BaseConnection, BaseRepository } from "@thothom/core";

import { MigrationEntity } from "./migration.entity";

import type { CreateMigrationRecordParams } from "./types/sync-manager";

export abstract class BaseSyncManager<Connection = any> {
	public connection: Connection;

	public repository: BaseRepository<MigrationEntity>;

	public async init(connectionClass: any, databaseConfig: any) {
		this.connection = await new connectionClass({
			entities: [MigrationEntity],
			databaseConfig,
		})
			.load()
			.connect();

		this.repository = (
			this.connection as unknown as BaseConnection
		).getRepository<MigrationEntity>(MigrationEntity);
	}

	public abstract getExecutedMigrations(): Promise<Array<string>>;

	public abstract createMigrationsTable(): Promise<void>;

	public abstract createMigrationRecord(
		p: CreateMigrationRecordParams,
	): Promise<void>;
}
