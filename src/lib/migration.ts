import { BaseQueryRunner } from "./query-runner";

export abstract class BaseMigration {
	public abstract name: string;

	public abstract description: string;

	public abstract up(queryRunner: BaseQueryRunner): Promise<void>;

	public abstract down(queryRunner: BaseQueryRunner): Promise<void>;
}
