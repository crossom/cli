import { isNotEmptyArray, getTypeof } from "@techmmunity/utils";

export const loadJsFiles = (entitiesPath: Array<string>) => {
	const jsFiles = entitiesPath.filter(path => path.endsWith(".js"));

	if (isNotEmptyArray(jsFiles)) {
		return jsFiles
			.map(filePath => {
				const exports = require(filePath) as Record<string, any>;

				const entities = Object.values(exports).filter(
					val => getTypeof(val) === "class",
				);

				return entities;
			})
			.flat();
	}

	return [];
};
