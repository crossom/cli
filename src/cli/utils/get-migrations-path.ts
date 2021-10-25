import { existsSync } from "fs";
import { ERROR_PREFIX } from "../config/prefixes";
import { getConfigFile } from "./get-config-file";
import { getRootPath } from "./get-root-path";

export const getMigrationsPath = () => {
	const { migrationsDir } = getConfigFile();

	if (!migrationsDir) {
		console.error(`\n${ERROR_PREFIX} Missing config: migrationsDir`);

		process.exit(1);
	}

	const migrationsDirPath = getRootPath(migrationsDir);

	const folderExists = existsSync(migrationsDirPath);

	if (!folderExists) {
		console.error(
			`\n${ERROR_PREFIX} Migrations dir doesn't exists: ${migrationsDirPath}`,
		);

		process.exit(1);
	}

	return migrationsDirPath;
};
