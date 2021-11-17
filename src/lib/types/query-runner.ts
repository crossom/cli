export type ColumnType =
	| string
	| "array-date"
	| "array-number"
	| "array-object"
	| "array-string"
	| "date"
	| "number"
	| "object"
	| "string";

/**
 * Create
 */

export interface CreateEntityParams {
	databaseName: string;
	extras?: Record<string, any>;
}

export interface CreateColumnParams {
	entityDatabaseName: string;
	columnDatabaseName: string;
	primary?: boolean;
	comment?: string;
	type?: ColumnType;
	enumName?: string;
	extras?: Record<string, any>;
}

export interface CreateEnumParams {
	entityDatabaseName: string;
	columnDatabaseName: string;
	enumName: string;
	enumValues: Array<number | string>;
	extras?: Record<string, any>;
}

export interface CreateIndexParams {
	entityDatabaseName: string;
	indexDatabaseName: string;
	columnsDatabaseNames: Array<string>;
	extras?: Record<string, Record<string, any>>;
}
