import { LoggerService as NestJsLoggerService } from '@nestjs/common';
export declare class WinstonLoggerService implements NestJsLoggerService {
    private formatLogMessage;
    private write;
    log(message: any, ...optionalParams: any[]): void;
    error(message: any, ...optionalParams: any[]): void;
    warn(message: any, ...optionalParams: any[]): void;
    debug?(message: any, ...optionalParams: any[]): void;
    verbose?(message: any, ...optionalParams: any[]): void;
    fatal?(message: any, ...optionalParams: any[]): void;
}
