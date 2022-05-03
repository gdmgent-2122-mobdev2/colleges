import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../BaseEntity";

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
}
