import { writeFileSync } from "fs";

import { getMigrationsPath } from "../utils/get-migrations-path";
import { getTemplate } from "../utils/get-template";
import { getThothVersion } from "../utils/get-thoth-version";

interface Args {
	description: string;
}

export const createMigration = async ({ description }: Args) => {
	const migrationsDirPath = await getMigrationsPath();

	const template = getTemplate("migration:create");
	const code = Date.now().toString();
	const thothVersion = getThothVersion();

	const formattedTemplate = template
		.replace(/\$\{CODE\}/g, code)
		.replace(/\$\{DESCRIPTION\}/g, description)
		.replace(/\$\{PLUGIN\}/g, "MANUAL")
		.replace(/\$\{THOTHOM_VERSION\}/g, thothVersion);

	writeFileSync(`${migrationsDirPath}/${code}.ts`, formattedTemplate);
};
