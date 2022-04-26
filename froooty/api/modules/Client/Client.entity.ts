import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Client {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    contactEmail: string;

    @Column()
    contactName: string;

}