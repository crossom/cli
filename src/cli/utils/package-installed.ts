import { existsSync } from "fs";
import { getRootPath } from "./get-root-path";

export const isPackageInstalled = (packageName: string) =>
	existsSync(getRootPath(`node_modules/${packageName}`));
