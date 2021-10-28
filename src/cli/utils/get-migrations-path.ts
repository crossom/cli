import { existsSync } from "fs";
import { getRootPath } from "@techmmunity/utils";

import { Logger } from "@techmmunity/symbiosis";
import { getConfigFile } from "./get-config-file";

export const getMigrationsPath = () => {
	const { migrationsDir } = getConfigFile();

	if (!migrationsDir) {
		Logger.cliError("Missing config: migrationsDir");
		process.exit(1);
	}

	const migrationsDirPath = getRootPath(migrationsDir);

	const folderExists = existsSync(migrationsDirPath);

	if (!folderExists) {
		Logger.cliError(`Migrations dir doesn't exists: ${migrationsDirPath}`);
		process.exit(1);
	}

	return migrationsDirPath;
};
