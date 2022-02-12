import type { Query } from "../types/migration-generator";

export const format = (queries: Array<Query>) => {
	const query = queries
		.map(({ command, type, data }) => {
			const formattedData = JSON.stringify(data, null, "\t")
				.replace(/\n\t/g, "\n\t\t\t")
				.replace(/}$/, "\t\t}")
				.replace(/"([^"]+)":/g, "$1:");

			const method = `${command}${
				type.charAt(0).toUpperCase() + type.slice(1)
			}`;

			return `${"\t\t"}queryRunner.${method}(${formattedData});`;
		})
		.join("\n");

	return `${query}${"\n\n\t\t"}await queryRunner.run();`;
};
