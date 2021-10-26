import { Query } from "../types/migration-generator";

export const format = (queries: Array<Query>) => {
	const query = queries
		.map(({ method, data }) => {
			const formattedData = JSON.stringify(data, null, "\t")
				.replace(/\n\t/g, "\n\t\t\t")
				.replace(/}$/, "\t\t}");

			return `${"\t\t"}queryRunner.${method}(${formattedData});`;
		})
		.join("\n");

	return `${query}${"\n\n\t\t"}await queryRunner.run();`;
};
