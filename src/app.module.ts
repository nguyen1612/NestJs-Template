import { WinstonModule } from 'nest-winston';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthMiddleware } from './middlewares/authen';
import { loggerOptions } from 'src/logger';
import { StorifyModule } from './apps/storify/storify.module';
import { CONFIG } from "src/config";

@Module({
    imports: [
        WinstonModule.forRoot(loggerOptions),
        StorifyModule
    ]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware)
                .forRoutes("**/auth/**")
                .apply();
    }
}