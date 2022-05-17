import {
    BeforeInsert,
    BeforeUpdate,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn,
} from "typeorm";
import ValidationError from "../errors/ValidationError";
import { validateOrReject } from "class-validator";

export abstract class BaseEntity {
    @CreateDateColumn({ select: false })
    createdAt: Date;

    @UpdateDateColumn({ select: false })
    updatedAt: Date;

    @DeleteDateColumn({ select: false })
    deletedAt: Date;

    @BeforeInsert()
    @BeforeUpdate()
    async validate() {
        try {
            await validateOrReject(this);
        } catch (errors) {
            // collect validation errors in object
            const validationErrors = {};
            for (const e of errors) {
                validationErrors[e.property] = e.constraints;
            }
            throw new ValidationError(validationErrors);
        }
    }
}
