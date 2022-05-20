import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BeforeInsert,
    BeforeUpdate,
    OneToMany,
} from "typeorm";
import { hash, compare } from "bcrypt";
import { UserRole } from "./User.constants";
import { BaseEntity } from "../BaseEntity";
import { IsDefined, IsEmail } from "class-validator";
import Log from "../Log/Log.entity";

@Entity()
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @IsDefined({ always: true })
    @Column()
    name: string;

    @IsDefined({ always: true })
    @Column()
    surname: string;

    @IsDefined({ always: true })
    @IsEmail(undefined, { always: true })
    @Column({ unique: true })
    email: string;

    @IsDefined({ groups: ["create"] })
    @Column({ select: false })
    password: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.User,
    })
    role: UserRole;

    @OneToMany(() => Log, (log) => log.user)
    logs: Log[];

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            this.password = await hash(this.password, 10);
        }
    }

    async checkPassword(passwordToCheck: string) {
        return await compare(passwordToCheck, this.password);
    }

    isAdmin() {
        return this.role === UserRole.Admin;
    }
}
