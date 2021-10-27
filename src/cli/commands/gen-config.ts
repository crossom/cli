import { writeFileSync } from "fs";

import { getRootPath } from "../utils/get-root-path";
import { getTemplate } from "../utils/get-template";

export const genConfig = () => {
	const template = getTemplate("config");

	writeFileSync(getRootPath("symbiosis.config.js"), template);
};
