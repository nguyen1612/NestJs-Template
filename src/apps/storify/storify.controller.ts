import { Controller, Get } from "@nestjs/common";
import { StorifyService } from "./storify.service";

@Controller({
    version: "1"
})
export class StorifyController {
    constructor(
        private readonly service: StorifyService
    ) {}

    @Get("")
    async test() {
        await this.service.createUser();
        return "CALLED";
    }
}