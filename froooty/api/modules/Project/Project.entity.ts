import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { BaseEntity } from "../BaseEntity";
import Client from "../Client/Client.entity";
import { IsDefined } from "class-validator";

@Entity()
export default class Project extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @IsDefined()
    @Column()
    name: string;

    @ManyToOne(() => Client, (client) => client.projects)
    client: Client;
}
