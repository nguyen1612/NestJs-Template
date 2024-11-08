import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { ValidationPipe, VersioningType } from '@nestjs/common';

import { AppModule } from './app.module';
import { ErrorMiddleware } from 'src/middlewares/error'
import { loggerInstance } from 'src/logger';
import { InvalidError } from 'src/error';
import { CONFIG } from './config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: WinstonModule.createLogger({
            instance: loggerInstance,
        }),
    });

    app.use(cookieParser());
    app.enableCors();
    app.enableVersioning({
        type: VersioningType.URI,
        prefix: 'api/v'
    });
    app.useGlobalFilters(new ErrorMiddleware());
    app.useGlobalPipes(new ValidationPipe({
        stopAtFirstError: true,
        exceptionFactory: errors => {
            console.log(errors);
            return new InvalidError("Validation failed");
        }
    }));
    await app.listen(CONFIG.SERVICE_PORT);
}
bootstrap();
