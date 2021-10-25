import { resolve } from "path";

export const getRootPath = (path: string) =>
	resolve(process.cwd(), ...path.split("/"));
