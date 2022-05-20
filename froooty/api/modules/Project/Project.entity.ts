import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
} from "typeorm";
import { BaseEntity } from "../BaseEntity";
import Client from "../Client/Client.entity";
import { IsDefined } from "class-validator";
import Log from "../Log/Log.entity";

@Entity()
export default class Project extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @IsDefined()
    @Column()
    name: string;

    @ManyToOne(() => Client, (client) => client.projects)
    client: Client;

    @OneToMany(() => Log, (log) => log.project)
    logs: Log[];
}
