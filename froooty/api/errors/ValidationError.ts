import BaseError from "./BaseError";

export default class ValidationError extends BaseError {
    constructor(e: Error) {
        super(e.message, 400);
    }
}
