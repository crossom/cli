import { existsSync } from "fs";
import { getRootPath } from "./get-root-path";

export const localBinExists = () =>
	existsSync(getRootPath("node_modules/@techmmunity/symbiosis-cli"));
