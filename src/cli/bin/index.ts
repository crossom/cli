#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */

import { getRootPath } from "@techmmunity/utils";
import { program } from "commander";

import { loadCommands } from "../commands";

import { localBinExists } from "../utils/local-bin-exists";
import { loadLocalBinCommandLoader } from "../utils/local-binaries";

const bootstrap = () => {
	const packageJsonPath = getRootPath("node_modules/@thothom/cli/package.json");

	program
		.version(
			require(packageJsonPath).version,
			"-v, --version",
			"Output the current version.",
		)
		.usage("<command> [options]")
		.helpOption("-h, --help", "Output usage information.");

	if (localBinExists()) {
		loadLocalBinCommandLoader(program);
	} else {
		loadCommands(program);
	}

	program.parse(process.argv);

	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
	if (!process.argv.slice(2).length) {
		program.outputHelp();
	}
};

bootstrap();
