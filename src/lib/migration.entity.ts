import {
	Column,
	Entity,
	PrimaryColumn,
	SaveDateColumn,
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

	@SaveDateColumn()
	public createdAt: string;
}
