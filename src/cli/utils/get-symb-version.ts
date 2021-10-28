import { getRootPath } from "@techmmunity/utils";

export const getSymbVersion = () => {
	const { dependencies } = require(getRootPath("package.json"));

	const version = dependencies["@techmmunity/symbiosis"].replace("^", "");

	return version;
};
