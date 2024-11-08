import { WinstonModule } from 'nest-winston';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AuthMiddleware } from './middlewares/authen';
import { loggerOptions } from 'src/logger';
import { StorifyModule } from './apps/storify/storify.module';
import { CONFIG } from "src/config";
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forRoot(CONFIG.DATABASE_URI),
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