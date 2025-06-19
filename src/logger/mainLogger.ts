import { createLogger, format, transports } from 'winston';
import * as fs from 'fs';
import * as path from 'path';
// eslint-disable-next-line @typescript-eslint/no-require-imports
import DailyRotateFile = require('winston-daily-rotate-file');
import 'winston-daily-rotate-file';
const logDirectory = path.join(process.cwd(), 'logs');

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const removeAnsiCodes = format((info) => {
  // eslint-disable-next-line no-control-regex
  const ansiRegex = /\x1b\[[0-9;]*m/g;

  if (typeof info.message === 'string') {
    info.message = info.message.replace(ansiRegex, '');
  }
  if (typeof info.level === 'string') {
    info.level = info.level.replace(ansiRegex, '');
  }

  return info;
});

const fileLogFormat = format.combine(
  format.timestamp({ format: 'DD.MM.YYYY, HH:mm:ss' }),
  removeAnsiCodes(),
  format.json(),
);

const consoleLogFormat = format.combine(
  format.colorize({ all: true }),
  format.timestamp({ format: 'DD.MM.YYYY, HH:mm:ss' }),
  format.printf((info) => {
    const { timestamp, level, message } = info;
    return `[${level}] ${String(timestamp)}  ${String(message)}`;
  }),
);

export const logger = createLogger({
  level: 'silly',

  transports: [
    // --- (all.log) ---
    new DailyRotateFile({
      filename: path.join(logDirectory, 'all-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'silly',
      format: fileLogFormat,
    }),

    // --- (error_warn.log)---
    new DailyRotateFile({
      filename: path.join(logDirectory, 'error_warn-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '10m',
      maxFiles: '30d',
      level: 'warn',
      format: fileLogFormat,
    }),

    new transports.Console({
      level: 'debug',
      format: consoleLogFormat,
    }),
  ],

  exitOnError: false,
});
