export interface CreateMigrationRecordParams {
	name: string;
	description: string;
}

export interface GenerateMigrationOutPut {
	up: string;
	down: string;
}
