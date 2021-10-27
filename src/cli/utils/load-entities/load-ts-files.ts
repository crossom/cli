import { isNotEmptyArray, getTypeof } from "@techmmunity/utils";
import { Logger } from "../../../utils/logger";
import { createDotSymbiosisDir } from "../create-dot-symb-dir";
import { getRootPath } from "../get-root-path";
import { isPackageInstalled } from "../package-installed";

export const loadTsFiles = (entitiesPath: Array<string>) => {
	const tsFiles = entitiesPath.filter(path => path.endsWith(".ts"));

	if (isNotEmptyArray(tsFiles)) {
		if (!isPackageInstalled("typescript")) {
			Logger.error("Missing package: typescript");
			process.exit(1);
		}

		const ts = require(getRootPath("node_modules/typescript")) as TS;

		const entitiesFolderPath = getRootPath(".symbiosis/entities");

		createDotSymbiosisDir(entitiesFolderPath);

		ts.createProgram(tsFiles, {
			module: ts.ModuleKind.CommonJS,
			moduleResolution: ts.ModuleResolutionKind.NodeJs,
			target: ts.ScriptTarget.ES2017,
			emitDecoratorMetadata: true,
			experimentalDecorators: true,
			outDir: entitiesFolderPath,
		}).emit();

		const jsFilesNames = tsFiles.map(file => {
			const fileName = file.split("/").pop()!.replace(".ts", "");

			return `${entitiesFolderPath}/${fileName}`;
		});

		return jsFilesNames
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
