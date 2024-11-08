import { Logger, LoggerOptions } from "winston";

export interface CustomLogger {
    loggerOptions: LoggerOptions,
    loggerInstance: Logger
};