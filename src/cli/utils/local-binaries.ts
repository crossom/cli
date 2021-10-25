/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */

import { Command } from "commander";
import { getRootPath } from "./get-root-path";

export const loadLocalBinCommandLoader = (program: Command) => {
	const { loadCommands } = require(getRootPath(
		"node_modules/@techmmunity/symbiosis-cli/commands",
	));

	return loadCommands(program);
};
