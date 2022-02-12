import { Logger } from "@techmmunity/symbiosis";
import { getRootPath, getTypeof } from "@techmmunity/utils";
import { existsSync } from "fs";

import type { ConfigFile } from "../types/config";

export const getConfigFile = () => {
	const path = getRootPath("symbiosis.config.js");

	if (existsSync(path)) {
		const config = require(path) as ConfigFile;

		if (getTypeof(config) === "object") {
			if (!config.plugin) {
				Logger.cliError("Missing config: plugin");
				process.exit(1);
			}

			if (!config.connectionConfig) {
				Logger.cliError("Missing config: connectionConfig");
				process.exit(1);
			}

			if (!config.migrationsDir) {
				Logger.cliError("Missing config: migrationsDir");
				process.exit(1);
			}

			return config;
		}
	}

	Logger.cliError("Missing config file: symbiosis.config.js");
	Logger.cliLog("Use `gen:config` to automatic generate a config file");

	process.exit(1);
};
