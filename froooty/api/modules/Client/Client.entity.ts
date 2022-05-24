import {
    BeforeSoftRemove,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntity } from "../BaseEntity";
import Project from "../Project/Project.entity";
import { IsDefined, IsEmail } from "class-validator";
import ProjectService from "../Project/Project.service";

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

    @Column({ nullable: true })
    avatar: string;

    @OneToMany(() => Project, (project) => project.client, {
        cascade: true,
    })
    projects: Project[];
}
