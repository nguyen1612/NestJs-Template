import { createLogger, format, transports, LoggerOptions } from "winston";

const enum Color {
    RED='\x1B[31m',
    GREEN='\x1B[32m',
    YELLOW='\x1B[33m'
};

function color(str: string, ansiCode: Color) {
    return `${ansiCode}${str}\x1B[39m`
}

const devLogger = () => {
    const logFormat = format.printf(logData => {
        let { timestamp, message, level, service, ...rest } = logData;
        const timeLabel = color('[Time]', Color.GREEN);
        const serviceLabel = color('[Service]', Color.GREEN);
        const levelLabel = color('[Level]', Color.YELLOW);
        const messageLabel = color('[Message]', Color.GREEN);
        const paramsLabel = color('[Parameters]', Color.GREEN);
        // Padding string
        level = level.padEnd(15, ' ');

        return `${timeLabel} ${timestamp} ` +
                // `${serviceLabel} ${service} ` +
                `${levelLabel} ${level} ` +
                `${messageLabel} ${message} ` +
                `${paramsLabel} ${JSON.stringify(rest)}`;
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
            format.colorize({}),
            logFormat,
        ),
        transports: [
            new transports.Console({
                level: 'debug'
            }),
        ],
        defaultMeta: { service: 'chat' }
    };

    return {
        loggerOptions,
        loggerInstance: createLogger(loggerOptions)
    }
};

export default devLogger;
