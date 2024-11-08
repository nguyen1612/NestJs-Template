import { CustomLogger } from "../utils/types";
import devLogger from "./dev";
import prodLogger from "./prod";

let logger: CustomLogger;
if (process.env.NODE_ENV === 'dev') {
    logger = devLogger();
} else {
    logger = devLogger();
}

const loggerOptions = logger.loggerOptions;
const loggerInstance = logger.loggerInstance;

export {
    loggerInstance,
    loggerOptions,
}