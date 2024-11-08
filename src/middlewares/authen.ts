import * as jwt from "jsonwebtoken";
import { Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { Request, NextFunction } from "express";
import { Logger } from "winston";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";

import { AuthorizationError } from "src/error";
import { CONFIG } from "src/config";

declare global {
    namespace Express {
        interface Request {
            user?: any
        }
    }
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

    use(req: Request, response: Response, next: NextFunction) {
        try {
            this.logger.info(`Request to url: ${req.originalUrl}`);
            this.logger.info(`Request method: ${req.method}`);
            this.logger.info('Start authenticating request');
            const accessToken = req.get('authorization').split(' ')[1];
            const secret = CONFIG.TOKEN.SECRET;
            const payload = <any>jwt.verify(accessToken, secret);
            req.user = payload;
            this.logger.info('Authenticate request succesfully');
            next();

        } catch (e) {
            this.logger.error(e?.name);
            console.log(e);
            return next(new AuthorizationError("Unauthorized request"));
        }
    }
}