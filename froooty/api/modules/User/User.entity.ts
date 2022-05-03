import { compare, hash } from "bcrypt";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../BaseEntity";
import { UserRole } from "./User.constants";

@Entity()
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.User,
    })
    role: UserRole;

    @BeforeInsert()
    async hashPassword() {
        if (this.password) {
            this.password = await hash(this.password, 10);
        }
    }

    async checkPassword(passwordToCheck: string) {
        return await compare(passwordToCheck, this.password);
    }
}
