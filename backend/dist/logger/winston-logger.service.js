"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WinstonLoggerService = void 0;
const common_1 = require("@nestjs/common");
const mainLogger_1 = require("./mainLogger");
const codeColor_1 = require("./codeColor");
let WinstonLoggerService = class WinstonLoggerService {
    formatLogMessage(message, optionalParams = []) {
        const stringMessage = String(message);
        let fullLogMessage = stringMessage;
        let context;
        const paramsToProcess = [...optionalParams];
        if (paramsToProcess.length > 0 &&
            typeof paramsToProcess[paramsToProcess.length - 1] === 'string') {
            context = paramsToProcess.pop();
        }
        if (context) {
            fullLogMessage = `${codeColor_1.colors.fgCyan}[${context}]${codeColor_1.colors.reset} ${fullLogMessage}`;
        }
        if (paramsToProcess.length > 0) {
            const additionalInfo = paramsToProcess
                .map((param) => {
                if (typeof param === 'object' && param !== null) {
                    try {
                        return JSON.stringify(param, null, 2);
                    }
                    catch {
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
    write(level, message, optionalParams) {
        const formattedMessage = this.formatLogMessage(message, optionalParams);
        mainLogger_1.logger[level](formattedMessage);
    }
    log(message, ...optionalParams) {
        this.write('info', message, optionalParams);
    }
    error(message, ...optionalParams) {
        this.write('error', message, optionalParams);
    }
    warn(message, ...optionalParams) {
        this.write('warn', message, optionalParams);
    }
    debug(message, ...optionalParams) {
        this.write('debug', message, optionalParams);
    }
    verbose(message, ...optionalParams) {
        this.write('verbose', message, optionalParams);
    }
    fatal(message, ...optionalParams) {
        this.write('error', message, optionalParams);
    }
};
exports.WinstonLoggerService = WinstonLoggerService;
exports.WinstonLoggerService = WinstonLoggerService = __decorate([
    (0, common_1.Injectable)()
], WinstonLoggerService);
//# sourceMappingURL=winston-logger.service.js.map