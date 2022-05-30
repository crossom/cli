import { Column, Entity, PrimaryColumn, InsertDateColumn } from "@thothom/core";

@Entity("migrations")
export class MigrationEntity {
	@PrimaryColumn()
	public fileName: string;

	@Column()
	public description: string;

	@Column()
	public hash: string;

	@Column()
	public libVersion: string;

	@InsertDateColumn()
	public createdAt: string;
}
