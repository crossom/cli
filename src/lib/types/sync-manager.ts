import { MigrationEntity } from "../migration.entity";

export type CreateMigrationRecordParams = Omit<MigrationEntity, "createdAt">;

export interface GenerateMigrationOutPut {
	up: string;
	down: string;
}
