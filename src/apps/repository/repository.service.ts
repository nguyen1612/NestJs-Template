import { Injectable, Inject } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

import { UserModel } from "src/models/User";

@Injectable()
export class RepositoryService {
    constructor(
        @InjectModel(UserModel.collection.name) private readonly user: typeof UserModel,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {}

    async createUser() {
        this.user.create({
            user_id: 10,
            user_name: "!@#"
        })
    }
}