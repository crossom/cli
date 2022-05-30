import { getRootPath } from "@techmmunity/utils";
import { writeFileSync } from "fs";

import { getTemplate } from "../utils/get-template";

export const genConfig = () => {
	const template = getTemplate("config");

	writeFileSync(getRootPath("thothom.config.js"), template);
};
