import { MigrationHandler } from "./migration-handler";

export abstract class BaseQueryRunner<
	Connection = any,
> extends MigrationHandler<Connection> {
	/**
	 * Run
	 */

	public abstract run(): Promise<void>;
}
