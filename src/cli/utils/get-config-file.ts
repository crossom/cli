import { existsSync } from "fs";
import { getTypeof } from "@techmmunity/utils";
import { getRootPath } from "./get-root-path";
import { ConfigFile } from "../types/config";
import { Logger } from "../../utils/logger";

export const getConfigFile = () => {
	const path = getRootPath("symbiosis.config.js");

	if (existsSync(path)) {
		const config = require(path) as ConfigFile;

		if (getTypeof(config) === "object") {
			if (!config.plugin) {
				Logger.error("Missing config: plugin");
				process.exit(1);
			}

			if (!config.connectionConfig) {
				Logger.error("Missing config: connectionConfig");
				process.exit(1);
			}

			if (!config.migrationsDir) {
				Logger.error("Missing config: migrationsDir");
				process.exit(1);
			}

			return config;
		}
	}

	Logger.error("Missing config file: symbiosis.config.js");
	Logger.log("Use `gen:config` to automatic generate a config file");

	process.exit(1);
};
