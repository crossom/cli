/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */

import { getRootPath } from "@techmmunity/utils";
import type { Command } from "commander";

export const loadLocalBinCommandLoader = (program: Command) => {
	const { loadCommands } = require(getRootPath(
		"node_modules/@techmmunity/symbiosis-cli/cli/commands",
	));

	return loadCommands(program);
};
