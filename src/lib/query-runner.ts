import {
	BaseQueryRunnerType,
	CreateEntityParams,
	CreateColumnParams,
	CreateIndexParams,
	CreateEnumParams,
} from "./types/query-runner";

export abstract class BaseQueryRunner<Connection = any>
	implements BaseQueryRunnerType
{
	public abstract queries: Array<any>;

	public constructor(public readonly connection: Connection) {}

	/**
	 * Create
	 */

	public abstract createEntity(p: CreateEntityParams): void;
	public abstract createColumn(p: CreateColumnParams): void;
	public abstract createEnum(p: CreateEnumParams): void;
	public abstract createIndex(p: CreateIndexParams): void;

	/**
	 * Run
	 */

	public abstract run(): Promise<void>;
}
