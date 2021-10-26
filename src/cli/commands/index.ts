import * as chalk from "chalk";
import { Command } from "commander";
import { Logger } from "../../utils/logger";

import { genConfig } from "./gen-config";
import { genMigrations } from "./gen-migration";
import { createMigration } from "./migration-create";

const handleInvalidCommand = (program: Command) => {
	program.on("command:*", () => {
		Logger.error(`Invalid command: ${chalk.red("%s")}`);

		Logger.log(
			`See ${chalk.red("--help")} for a list of available commands.\n`,
		);

		process.exit(1);
	});
};

export const loadCommands = (program: Command) => {
	program
		.command("migration:create <description...>")
		.description("Create an empty migration.")
		.action((description: Array<string>) =>
			createMigration({ description: description.join(" ") }),
		);

	/** ------- */

	program
		.command("gen:config")
		.description("Create an example config file.")
		.action(() => genConfig());

	/** ------- */

	program
		.command("migration:generate")
		.description("Generate migrations.")
		.action(() => genMigrations());

	/** ------- */

	handleInvalidCommand(program);
};
