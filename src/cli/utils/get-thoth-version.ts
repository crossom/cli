import { getRootPath } from "@techmmunity/utils";

export const getThothVersion = () => {
	const { dependencies } = require(getRootPath("package.json"));

	const version = dependencies["@thothom/core"].replace("^", "");

	return version;
};
