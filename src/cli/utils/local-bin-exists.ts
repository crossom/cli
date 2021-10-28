import { getRootPath } from "@techmmunity/utils";
import { existsSync } from "fs";

export const localBinExists = () =>
	existsSync(getRootPath("node_modules/@techmmunity/symbiosis-cli"));
