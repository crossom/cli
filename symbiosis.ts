import { DynamoDbConnectionOptions } from "@techmmunity/symbiosis-dynamodb";
import { ConfigFile } from "./src/cli/types/config";

const config: ConfigFile<DynamoDbConnectionOptions> = {
	plugin: "@techmmunity/symbiosis-dynamodb",
	connectionConfig: {
		entities: [],
		databaseConfig: {
			region: "",
			credentials: {
				accessKeyId: "",
				secretAccessKey: "",
			},
		},
	},
	migrationsDir: "migrations",
};

module.exports = config;
