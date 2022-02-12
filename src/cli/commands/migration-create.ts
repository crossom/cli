import { writeFileSync } from "fs";

import { getMigrationsPath } from "../utils/get-migrations-path";
import { getSymbVersion } from "../utils/get-symb-version";
import { getTemplate } from "../utils/get-template";

interface Args {
	description: string;
}

export const createMigration = ({ description }: Args) => {
	const migrationsDirPath = getMigrationsPath();

	const template = getTemplate("migration:create");
	const code = Date.now().toString();
	const symbVersion = getSymbVersion();

	const formattedTemplate = template
		.replace(/\$\{CODE\}/g, code)
		.replace(/\$\{DESCRIPTION\}/g, description)
		.replace(/\$\{PLUGIN\}/g, "MANUAL")
		.replace(/\$\{SYMB_VERSION\}/g, symbVersion);

	writeFileSync(`${migrationsDirPath}/${code}.ts`, formattedTemplate);
};
