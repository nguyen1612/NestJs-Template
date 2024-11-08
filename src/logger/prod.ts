import { join } from "path";
import { createLogger, format, transports, LoggerOptions } from "winston";
import DailyRotateFile from 'winston-daily-rotate-file';


const devLogger = () => {
    const LOG_DIRECTORY = join("/var/log");

    const logFormat = format.printf(logData => {
        const { timestamp, service, level, message, ...rest } = logData;
        const parameters = rest;
        return JSON.stringify({ timestamp, service, level, message, parameters });
    });

    const loggerOptions: LoggerOptions = {
        format: format.combine(
            format(metadata => {
                metadata.level = metadata.level.toUpperCase();
                return metadata;
            })(),
            format.timestamp({
                format: 'YYYY-MM-DD, HH:mm:ss'
            }),
            format.json(),
            logFormat,
        ),
        transports: [
            new DailyRotateFile({
                filename: join(LOG_DIRECTORY, "codgen.log"),
                level: "info",
                datePattern: "YYYY-MM-DD",
                utc: true,
                zippedArchive: true,
                maxSize: "20m",
                maxFiles: "7d"
            }),
            new transports.Console({
                level: 'debug'
            }),
        ],
        defaultMeta: { service: 'chat' }
    }

    return {
        loggerOptions,
        loggerInstance: createLogger(loggerOptions)
    }
};

export default devLogger;
