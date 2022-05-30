/* eslint-disable @typescript-eslint/naming-convention */

import type { BaseConnectionOptions, BaseConnection } from "@thothom/core";

import type { BaseQueryRunner, BaseSyncManager } from "../../..";

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
