import { existsSync } from "fs";
import { getRootPath } from "./get-root-path";
import { ERROR_PREFIX } from "../config/prefixes";
import { ConfigFile } from "../types/config";

export const getConfigFile = () => {
	const path = getRootPath("symbiosis.ts");

	if (existsSync(path)) {
		return require(getRootPath("symbiosis.ts")) as ConfigFile;
	}

	console.error(`\n${ERROR_PREFIX} Missing config file: symbiosis.ts`);

	process.exit(1);
};
