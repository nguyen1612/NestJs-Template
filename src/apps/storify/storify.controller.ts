import { Controller, Get } from "@nestjs/common";

@Controller({
    version: "1"
})
export class StorifyController {
    @Get("")
    test() {
        return "CALLED";
    }
}