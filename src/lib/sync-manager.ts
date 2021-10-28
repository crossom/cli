import { CreateMigrationRecordParams } from "./types/sync-manager";

export abstract class BaseSyncManager<Connection = any> {
	public constructor(protected readonly connection: Connection) {}

	public abstract getExecutedMigrations(): Promise<Array<string>>;

	public abstract createMigrationsTable(): Promise<void>;

	public abstract createMigrationRecord(
		p: CreateMigrationRecordParams,
	): Promise<void>;
}
