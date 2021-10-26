/* eslint-disable @typescript-eslint/naming-convention */

import { BaseConnectionOptions, BaseConnection } from "@techmmunity/symbiosis";
import { BaseQueryRunner, BaseSyncManager } from "../../..";

export interface Plugin {
	Connection: {
		new (connectionConfig: BaseConnectionOptions): BaseConnection;
	};
	QueryRunner: {
		new (connection: any): BaseQueryRunner;
	};
	SyncManager: {
		new (connection: any): BaseSyncManager;
	};
}
