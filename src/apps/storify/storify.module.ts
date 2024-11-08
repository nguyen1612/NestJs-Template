import { Module } from "@nestjs/common";

import { StorifyService } from "./storify.service";
import { StorifyController } from "./storify.controller";
import { RepositoryModule } from "../repository/repository.module";

@Module({
    imports: [
        RepositoryModule
    ],
    controllers: [
        StorifyController
    ],
    providers: [
        StorifyService
    ]
})
export class StorifyModule {}