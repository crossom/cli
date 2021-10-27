import { BaseConnectionOptions } from "@techmmunity/symbiosis";

export interface ConfigFile<Opts = BaseConnectionOptions> {
	plugin: string;
	connectionConfig: Omit<Opts, "entities">;
	migrationsDir: string;
	entitiesDir: Array<string>;
}
