#!/usr/bin/env node

import { program } from "commander";

import { loadCommands } from "../commands";

import { getThothVersion } from "../utils/get-thoth-version";
import { localBinExists } from "../utils/local-bin-exists";
import { loadLocalBinCommandLoader } from "../utils/local-binaries";

const bootstrap = async () => {
	const thothVersion = getThothVersion();

	program
		.version(thothVersion, "-v, --version", "Output the current version.")
		.usage("<command> [options]")
		.helpOption("-h, --help", "Output usage information.");

	if (localBinExists()) {
		await loadLocalBinCommandLoader(program);
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
