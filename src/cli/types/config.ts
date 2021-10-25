import { BaseConnectionOptions } from "@techmmunity/symbiosis";

export interface ConfigFile<Opts = BaseConnectionOptions> {
	plugin: string;
	connectionConfig: Opts;
	migrationsDir?: string;
}
