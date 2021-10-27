import { mkdirSync, existsSync, readFileSync, writeFileSync } from "fs";
import { getRootPath } from "./get-root-path";

export const createDotSymbiosisDir = (path: string) => {
	const dotSymbFolderPath = getRootPath(".symbiosis");

	if (!existsSync(dotSymbFolderPath)) {
		mkdirSync(dotSymbFolderPath);

		const gitIgnorePath = getRootPath(".gitignore");

		if (existsSync(gitIgnorePath)) {
			const gitIgnore = readFileSync(gitIgnorePath, "utf8");

			if (!gitIgnore.includes("\n/.symbiosis\n")) {
				const message =
					"# Do not touch it! Symb needs this exact exclude, or will generate it again.\n/.symbiosis\n";

				const ignore = gitIgnore.endsWith("\n\n")
					? message
					: `${"\n\n"}${message}`;

				writeFileSync(gitIgnorePath, `${gitIgnore}${ignore}`);
			}
		}
	}

	mkdirSync(path, {
		recursive: true,
	});
};
