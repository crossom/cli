import {
	Column,
	Entity,
	PrimaryColumn,
	InsertDateColumn,
} from "@techmmunity/symbiosis";

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
