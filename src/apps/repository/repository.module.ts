import { Module } from "@nestjs/common";

import { RepositoryService } from "./repository.service";
import { MongooseModule } from "@nestjs/mongoose";
import { collections } from "src/models";

@Module({
    imports: [
        MongooseModule.forFeature(collections)
    ],
    providers: [
        RepositoryService,
    ],
    exports: [
        RepositoryService
    ]
})
export class RepositoryModule {}