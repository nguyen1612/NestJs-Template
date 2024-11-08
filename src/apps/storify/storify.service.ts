import { Inject, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";

import { RepositoryService } from "../repository/repository.service";

@Injectable()
export class StorifyService {
    constructor(
        private readonly model: RepositoryService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {}

    async createUser() {
        await this.model.createUser();
    }
}