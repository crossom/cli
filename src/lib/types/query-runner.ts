export interface BaseQueryRunnerType {
	createEntity: any;
	createColumn: any;
	createEnum: any;
	createIndex: any;
}

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
	type?: string;
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
