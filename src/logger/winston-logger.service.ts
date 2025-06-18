import {
  Injectable,
  LoggerService as NestJsLoggerService,
} from '@nestjs/common';
import { logger } from './mainLogger';

// ANSI escape-коды для цветов
const colors = {
  reset: '\x1b[0m', // Сброс всех атрибутов
  bright: '\x1b[1m', // Яркий/жирный
  dim: '\x1b[2m', // Тусклый
  underscore: '\x1b[4m', // Подчеркнутый
  blink: '\x1b[5m', // Мигающий
  reverse: '\x1b[7m', // Инверсия (цвет текста и фона меняются местами)
  hidden: '\x1b[8m', // Скрытый текст

  fgBlack: '\x1b[30m', // Цвет текста: Черный
  fgRed: '\x1b[31m', // Цвет текста: Красный
  fgGreen: '\x1b[32m', // Цвет текста: Зеленый
  fgYellow: '\x1b[33m', // Цвет текста: Желтый
  fgBlue: '\x1b[34m', // Цвет текста: Синий
  fgMagenta: '\x1b[35m', // Цвет текста: Пурпурный
  fgCyan: '\x1b[36m', // Цвет текста: Голубой
  fgWhite: '\x1b[37m', // Цвет текста: Белый

  bgBlack: '\x1b[40m', // Цвет фона: Черный
  bgRed: '\x1b[41m', // Цвет фона: Красный
  bgGreen: '\x1b[42m', // Цвет фона: Зеленый
  bgYellow: '\x1b[43m', // Цвет фона: Желтый
  bgBlue: '\x1b[44m', // Цвет фона: Синий
  bgMagenta: '\x1b[45m', // Цвет фона: Пурпурный
  bgCyan: '\x1b[46m', // Цвет фона: Голубой
  bgWhite: '\x1b[47m', // Цвет фона: Белый
};

@Injectable()
export class WinstonLoggerService implements NestJsLoggerService {
  private formatLogMessage(message: any, optionalParams: any[] = []): string {
    const stringMessage = String(message);
    let fullLogMessage = stringMessage;

    let context: string | undefined;
    const paramsToProcess: any[] = [...(optionalParams as Array<unknown>)];

    if (
      paramsToProcess.length > 0 &&
      typeof paramsToProcess[paramsToProcess.length - 1] === 'string'
    ) {
      context = paramsToProcess.pop() as string;
    }

    if (context) {
      fullLogMessage = `${colors.fgCyan}[${context}]${colors.reset} ${fullLogMessage}`;
    }

    if (paramsToProcess.length > 0) {
      const additionalInfo = paramsToProcess
        .map((param) => {
          if (typeof param === 'object' && param !== null) {
            try {
              return JSON.stringify(param, null, 2);
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (e) {
              return String(param);
            }
          }
          return String(param);
        })
        .join('\n    ');
      fullLogMessage += `\nAdditional Data:\n    ${additionalInfo}`;
    }

    return fullLogMessage;
  }

  log(message: any, ...optionalParams: any[]) {
    const formattedMessage = this.formatLogMessage(message, optionalParams);
    logger.info(formattedMessage);
  }

  error(message: any, ...optionalParams: any[]) {
    const formattedMessage = this.formatLogMessage(message, optionalParams);
    logger.error(formattedMessage);
  }

  warn(message: any, ...optionalParams: any[]) {
    const formattedMessage = this.formatLogMessage(message, optionalParams);
    logger.warn(formattedMessage);
  }

  debug?(message: any, ...optionalParams: any[]) {
    const formattedMessage = this.formatLogMessage(message, optionalParams);
    logger.debug(formattedMessage);
  }

  verbose?(message: any, ...optionalParams: any[]) {
    const formattedMessage = this.formatLogMessage(message, optionalParams);
    logger.verbose(formattedMessage);
  }

  fatal?(message: any, ...optionalParams: any[]) {
    const formattedMessage = this.formatLogMessage(message, optionalParams);
    logger.error(formattedMessage);
  }
}
