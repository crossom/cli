import { cleanObj } from "@techmmunity/utils";

import { format } from "./helpers/format";

import type { Query } from "./types/migration-generator";
import type {
	CreateEntityParams,
	CreateColumnParams,
	CreateIndexParams,
	CreateEnumParams,
} from "./types/query-runner";

export class MigrationHandler<Connection = any> {
	public queries: Array<Query>;

	public constructor(public readonly connection?: Connection) {
		this.queries = [];
	}

	/**
	 * Create
	 */

	public createEntity(data: CreateEntityParams) {
		this.queries.push({
			command: "create",
			type: "entity",
			data: cleanObj(data),
		});
	}

	public createColumn(data: CreateColumnParams) {
		this.queries.push({
			command: "create",
			type: "column",
			data: cleanObj(data),
		});
	}

	public createEnum(data: CreateEnumParams) {
		this.queries.push({
			command: "create",
			type: "enum",
			data: cleanObj(data),
		});
	}

	public createIndex(data: CreateIndexParams) {
		this.queries.push({
			command: "create",
			type: "index",
			data: cleanObj(data),
		});
	}

	/**
	 * Generate Migration Text
	 */

	public genMigration() {
		return {
			up: format(this.queries),
			down: "",
		};
	}
}
