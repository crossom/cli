import { format } from "../../../lib/helpers/format";
import { Query } from "../../../lib/types/migration-generator";

describe("MigrationGenerator > format", () => {
	const queries: Array<Query> = [
		{
			command: "create",
			type: "entity",
			data: {
				databaseName: "databaseName",
				extras: {
					aa: [
						{
							foo: "sadas",
						},
					],
				},
			},
		},
		{
			command: "create",
			type: "column",
			data: {
				columnDatabaseName: "columnDatabaseName",
				entityDatabaseName: "entityDatabaseName",
			},
		},
	];

	it("should format correctly", () => {
		let result: any;

		try {
			result = format(queries);
		} catch (err: any) {
			result = err;
		}

		expect(result).toBe(`		queryRunner.createEntity({
			databaseName: "databaseName",
			extras: {
				aa: [
					{
						foo: "sadas"
					}
				]
			}
		});
		queryRunner.createColumn({
			columnDatabaseName: "columnDatabaseName",
			entityDatabaseName: "entityDatabaseName"
		});

		await queryRunner.run();`);
	});
});
