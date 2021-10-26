import { cleanObj } from "@techmmunity/utils";
import { Query } from "../types/migration-generator";
import {
	BaseQueryRunnerType,
	CreateColumnParams,
	CreateEntityParams,
	CreateEnumParams,
	CreateIndexParams,
} from "../types/query-runner";
import { format } from "./format";

export class MigrationGenerator implements BaseQueryRunnerType {
	public queries: Array<Query>;

	public constructor() {
		this.queries = [];
	}

	/**
	 * Create
	 */

	public createEntity(data: CreateEntityParams) {
		this.queries.push({
			method: "createEntity",
			data: cleanObj(data),
		});
	}

	public createColumn(data: CreateColumnParams) {
		this.queries.push({
			method: "createColumn",
			data: cleanObj(data),
		});
	}

	public createEnum(data: CreateEnumParams) {
		this.queries.push({
			method: "createEnum",
			data: cleanObj(data),
		});
	}

	public createIndex(data: CreateIndexParams) {
		this.queries.push({
			method: "createIndex",
			data: cleanObj(data),
		});
	}

	/**
	 * Run
	 */

	public format() {
		return {
			up: format(this.queries),
			down: format(this.queries.reverse()),
		};
	}
}
