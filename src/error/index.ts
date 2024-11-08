import { HttpException } from "@nestjs/common";
import { loggerInstance } from "src/logger";

const logger = loggerInstance;

export abstract class BaseError extends HttpException {
    constructor(message: string, statusCode: number) {
        super({ message, statusCode }, statusCode);
    }
}

export class AuthorizationError extends BaseError {
    constructor(message: string, statusCode: number = 401) {
        logger.error(message);
        super(message, statusCode);
    }
}

export class AuthenticationError extends BaseError {
    constructor(message: string, statusCode: number = 403) {
        logger.error(message);
        super(message, statusCode);
    }
}

export class InvalidError extends BaseError {
    constructor(message: string, statusCode: number = 400) {
        logger.error(message);
        super(message, statusCode);
    }
}

export class InternalServiceError extends BaseError {
    constructor(message: string) {
        logger.error(message);
        super('Internal Service Error', 500);
    }
}