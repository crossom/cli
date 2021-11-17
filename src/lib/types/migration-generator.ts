import {
	CreateColumnParams,
	CreateEntityParams,
	CreateEnumParams,
	CreateIndexParams,
} from "./query-runner";

interface BaseQuery {
	command: "create";
	type: "column" | "entity" | "enum" | "index";
}

interface CreateEntityQuery extends BaseQuery {
	type: "entity";
	data: CreateEntityParams;
}

interface CreateColumnQuery extends BaseQuery {
	type: "column";
	data: CreateColumnParams;
}

interface CreateEnumQuery extends BaseQuery {
	type: "enum";
	data: CreateEnumParams;
}

interface CreateIndexQuery extends BaseQuery {
	type: "index";
	data: CreateIndexParams;
}

export type Query =
	| CreateColumnQuery
	| CreateEntityQuery
	| CreateEnumQuery
	| CreateIndexQuery;
