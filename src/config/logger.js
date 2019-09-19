import winston, { format } from 'winston';

const { combine, timestamp, printf } = format;

const myFormat = printf(
    ({ level, message, timestamp }) =>
        `${timestamp}  ${level.toUpperCase()} --- ${message}`,
);

let logger;
export default logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: './src/logs/error.log',
            format: combine(timestamp(), myFormat),
            level: 'error',
            colorize: true,
            handleExceptions: true,
        }),
        new winston.transports.File({
            filename: './src/logs/combined.log',
            colorize: true,
            format: combine(timestamp(), myFormat),
        }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
    );
}
