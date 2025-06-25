"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
const fs = require("fs");
const path = require("path");
const codeColor_1 = require("./codeColor");
require("winston-daily-rotate-file");
const logDirectory = path.join(process.cwd(), 'logs');
try {
    if (!fs.existsSync(logDirectory)) {
        fs.mkdirSync(logDirectory);
    }
}
catch (error) {
    console.error(`Не удалось создать папку ${error}`);
}
const ansiRegex = /\x1b\[[0-9;]*m/g;
const removeAnsiCodes = (0, winston_1.format)((info) => {
    if (typeof info.message === 'string') {
        info.message = info.message.replace(ansiRegex, '');
    }
    if (typeof info.level === 'string') {
        info.level = info.level.replace(ansiRegex, '');
    }
    return info;
});
function myStartsWithCaseSensitive(mainString, prefix) {
    if (mainString.length < prefix.length) {
        return false;
    }
    const extractedPrefix = mainString.replace(ansiRegex, '').slice(0, 4);
    return extractedPrefix === prefix;
}
const fileLogFormat = winston_1.format.combine(winston_1.format.timestamp({ format: 'DD.MM.YYYY, HH:mm:ss' }), removeAnsiCodes(), winston_1.format.json());
const consoleLogFormat = winston_1.format.combine(winston_1.format.colorize({ all: true }), winston_1.format.timestamp({ format: 'DD.MM.YYYY, HH:mm:ss' }), winston_1.format.printf((info) => {
    const { timestamp, level, message } = info;
    const stringMessage = String(message);
    if (myStartsWithCaseSensitive(stringMessage, 'HTTP')) {
        return `${codeColor_1.colors.fgYellow}[http]${codeColor_1.colors.reset} ${String(timestamp)}  ${String(message)}`;
    }
    else
        return `[${level}] ${String(timestamp)}  ${String(message)}`;
}));
exports.logger = (0, winston_1.createLogger)({
    level: 'silly',
    transports: [
        new winston_1.transports.DailyRotateFile({
            filename: path.join(logDirectory, 'all-%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            level: 'silly',
            format: fileLogFormat,
        }),
        new winston_1.transports.DailyRotateFile({
            filename: path.join(logDirectory, 'error_warn-%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '10m',
            maxFiles: '30d',
            level: 'warn',
            format: fileLogFormat,
        }),
        new winston_1.transports.Console({
            level: 'debug',
            format: consoleLogFormat,
        }),
    ],
    exitOnError: false,
});
//# sourceMappingURL=mainLogger.js.map