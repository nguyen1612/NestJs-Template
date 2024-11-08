import { ArgumentsHost, Catch } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Response } from "express";

import { BaseError } from "src/error";
import { loggerInstance } from "src/logger";

@Catch()
export class ErrorMiddleware extends BaseExceptionFilter {
    private readonly logger = loggerInstance;

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        let body;
        if (exception instanceof BaseError) {
            body = exception.getResponse();
        } else {
            this.logger.error(exception?.message);
            body = { statusCode: 500, message: 'Internal Server Error' };
        }
        response.status(200).json(body);
    }
}