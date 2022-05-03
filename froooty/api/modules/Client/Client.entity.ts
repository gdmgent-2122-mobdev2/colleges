import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../BaseEntity";
import Project from "../Project/Project.entity";

@Entity()
export default class Client extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    contactEmail: string;

    @Column()
    contactName: string;

    @OneToMany(() => Project, (project) => project.client)
    projects: Project[];
}
