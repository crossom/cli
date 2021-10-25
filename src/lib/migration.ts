import { QueryRunner } from "./query-runner";

export abstract class BaseMigration {
	public abstract name: string;

	public abstract description: string;

	public abstract up(queryRunner: QueryRunner): Promise<void>;

	public abstract down(queryRunner: QueryRunner): Promise<void>;
}
