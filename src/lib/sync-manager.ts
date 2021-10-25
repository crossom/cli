import { BaseConnection } from "@techmmunity/symbiosis";

export abstract class SyncManager {
	public constructor(protected readonly connection: BaseConnection) {}

	public abstract getExecutedMigrations(): Promise<Array<string>>;
}
