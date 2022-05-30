import { Logger } from "@thothom/core";
import chalk from "chalk";
import type { Command } from "commander";

import { genConfig } from "./gen-config";
import { genMigrations } from "./gen-migration/gen-migration";
import { createMigration } from "./migration-create";

const handleInvalidCommand = (program: Command) => {
	program.on("command:*", () => {
		Logger.cliError(`Invalid command: ${chalk.red("%s")}`);

		Logger.cliLog(
			`See ${chalk.red("--help")} for a list of available commands.\n`,
		);

		process.exit(1);
	});
};

export const loadCommands = (program: Command) => {
	program
		.command("create:migration <description...>")
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
		.command("gen:migration")
		.description("Generate migrations.")
		.action(() => genMigrations());

	/** ------- */

	handleInvalidCommand(program);
};
