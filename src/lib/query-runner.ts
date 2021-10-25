import { BaseConnection } from "@techmmunity/symbiosis";

/**
 * Create
 */
interface CreateTableParams {
	tableName: string;
	extras?: Record<string, any>;
}

interface CreateIndexParams {
	tableName: string;
	indexName: string;
	columns: Array<string>;
	extras?: Record<string, any>;
}

interface CreateColumnParams {
	tableName: string;
	columnName: string;
	comment?: string;
	columnType?: string;
	enumName?: string;
	enumValues?: Array<number | string>;
	extras?: Record<string, any>;
}

export abstract class QueryRunner {
	public constructor(public readonly connection: BaseConnection) {}

	/**
	 * Create
	 */

	public abstract createTable(p: CreateTableParams): this;
	public abstract createIndex(p: CreateIndexParams): this;
	public abstract createColumn(p: CreateColumnParams): this;

	/**
	 * Run
	 */

	public abstract run(): void;
}
