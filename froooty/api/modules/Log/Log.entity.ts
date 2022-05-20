import { IsDefined } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { BaseEntity } from "../BaseEntity";
import Project from "../Project/Project.entity";
import User from "../User/User.entity";

@Entity()
export default class Log extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @IsDefined({ always: true })
    @Column()
    description: string;

    @IsDefined({ always: true })
    @Column("date")
    date: string;

    @IsDefined({ always: true })
    @Column("int")
    time: number;

    @ManyToOne(() => Project, (project) => project.logs)
    project: Project;

    @ManyToOne(() => User, (user) => user.logs)
    user: User;
}
