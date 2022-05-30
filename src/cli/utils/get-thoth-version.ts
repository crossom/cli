import { getRootPath } from "@techmmunity/utils";
import { ThothError } from "@thothom/core";
import { readFileSync, existsSync } from "fs";

export const getThothVersion = () => {
	const packageJsonPath = getRootPath("package.json");

	if (!existsSync(packageJsonPath)) {
		throw new ThothError({
			message: "package.json was not found",
			code: "AUTOMATION_FAILED",
			origin: "THOTHOM",
			details: [`Path: ${packageJsonPath}`],
		});
	}

	const { dependencies } = JSON.parse(readFileSync(packageJsonPath, "utf8"));

	const version = dependencies?.["@thothom/core"]?.replace("^", "");

	if (!version) {
		throw new ThothError({
			message: "@thothom/cli version was not found on the dependencies",
			code: "AUTOMATION_FAILED",
			origin: "THOTHOM",
			details: [`Path: ${packageJsonPath}`],
		});
	}

	return version;
};
