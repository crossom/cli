import type { BaseConnectionOptions } from "@thothom/core";

export interface ConfigFile<Opts = BaseConnectionOptions> {
	plugin: string;
	connectionConfig: Omit<Opts, "entities">;
	migrationsDir: string;
	entitiesDir: Array<string>;
}
