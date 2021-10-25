import { writeFileSync } from "fs";
import { getTemplate } from "../utils/get-template";
import { getMigrationsPath } from "../utils/get-migrations-path";

interface Args {
	description: string;
}

export const createMigration = ({ description }: Args) => {
	const migrationsDirPath = getMigrationsPath();

	const template = getTemplate("migration:create");
	const code = Date.now().toString();

	const formattedTemplate = template
		.replace(/\$\{CODE\}/g, code)
		.replace(/\$\{DESCRIPTION\}/g, description);

	writeFileSync(`${migrationsDirPath}/${code}.ts`, formattedTemplate);
};
