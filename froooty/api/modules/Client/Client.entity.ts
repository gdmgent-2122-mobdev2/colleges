import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../BaseEntity";
import Project from "../Project/Project.entity";
import { IsDefined, IsEmail } from "class-validator";

@Entity()
export default class Client extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @IsDefined({ always: true })
    @Column()
    name: string;

    @IsDefined({ always: true })
    @IsEmail(undefined, { always: true })
    @Column()
    contactEmail: string;

    @IsDefined({ always: true })
    @Column()
    contactName: string;

    @OneToMany(() => Project, (project) => project.client)
    projects: Project[];
}
