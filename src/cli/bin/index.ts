#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */

import { program } from "commander";

import { loadCommands } from "../commands";

import { localBinExists } from "../utils/local-bin-exists";
import { loadLocalBinCommandLoader } from "../utils/local-binaries";

const bootstrap = () => {
	program
		.version(
			require("../../package.json").version,
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
