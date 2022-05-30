import { getRootPath } from "@techmmunity/utils";
import type { Command } from "commander";

export const loadLocalBinCommandLoader = async (program: Command) => {
	const { loadCommands } = await import(
		getRootPath("node_modules/@thothom/cli/cli/commands")
	);

	return loadCommands(program);
};
