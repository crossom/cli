import { MetadataUtil } from "@techmmunity/symbiosis";
import { isEmptyArray } from "@techmmunity/utils";
import { globUtil } from "../../../utils/glob";
import { Logger } from "../../../utils/logger";
import { getRootPath } from "../get-root-path";
import { loadJsFiles } from "./load-js-files";
import { loadTsFiles } from "./load-ts-files";

export const loadEntities = async (
	entitiesDir: Array<string>,
): Promise<Array<any>> => {
	const entitiesPath = await Promise.all(
		entitiesDir.map(dir => globUtil(getRootPath(dir))),
	).then(result => result.flat());

	if (isEmptyArray(entitiesPath)) {
		Logger.error(`No entities found at: ${entitiesDir.join(", ")}`);
		process.exit(1);
	}

	const allEntities = [
		...loadJsFiles(entitiesPath),
		...loadTsFiles(entitiesPath),
	];

	return allEntities.filter(entity => {
		const isSubEntity = MetadataUtil.getEntityMetadata({
			entity,
			metadataKey: "isSubEntity",
		});

		return isSubEntity !== true;
	});
};
