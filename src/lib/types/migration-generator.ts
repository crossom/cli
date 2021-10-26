import {
	BaseQueryRunnerType,
	CreateColumnParams,
	CreateEntityParams,
	CreateEnumParams,
	CreateIndexParams,
} from "./query-runner";

interface BaseQuery {
	method: keyof BaseQueryRunnerType;
}

interface CreateEntityQuery extends BaseQuery {
	method: "createEntity";
	data: CreateEntityParams;
}

interface CreateColumnQuery extends BaseQuery {
	method: "createColumn";
	data: CreateColumnParams;
}

interface CreateEnumQuery extends BaseQuery {
	method: "createEnum";
	data: CreateEnumParams;
}

interface CreateIndexQuery extends BaseQuery {
	method: "createIndex";
	data: CreateIndexParams;
}

export type Query =
	| CreateColumnQuery
	| CreateEntityQuery
	| CreateEnumQuery
	| CreateIndexQuery;
