import { getRootPath } from "@techmmunity/utils";
import { readFileSync } from "fs";
import { localBinExists } from "./local-bin-exists";

export const getTemplate = (templateName: string) => {
	if (localBinExists()) {
		return readFileSync(
			getRootPath(
				`node_modules/@techmmunity/symbiosis-cli/cli/templates/${templateName}`,
			),
			"utf8",
		);
	}

	return readFileSync(getRootPath(`src/cli/templates/${templateName}`), "utf8");
};
