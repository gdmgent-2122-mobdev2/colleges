import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { BaseEntity } from "../BaseEntity";
import Client from "../Client/Client.entity";

@Entity()
export default class Project extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Client, (client) => client.projects)
    client: Client;
}
