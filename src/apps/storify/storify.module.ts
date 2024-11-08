import { Module } from "@nestjs/common";
import { StorifyService } from "./storify.service";
import { StorifyController } from "./storify.controller";

@Module({
    controllers: [
        StorifyController
    ],
    providers: [
        StorifyService
    ]
})
export class StorifyModule {}