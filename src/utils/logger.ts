import { ERROR_PREFIX, INFO_PREFIX } from "../cli/config/prefixes";

export class Logger {
	public static log(message: string) {
		// eslint-disable-next-line no-console
		console.log(`\n${INFO_PREFIX} ${message}`);
	}

	public static error(message: string) {
		console.error(`\n${ERROR_PREFIX} ${message}`);
	}
}
