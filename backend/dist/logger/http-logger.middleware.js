"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpLoggerMiddleware = void 0;
const common_1 = require("@nestjs/common");
const mainLogger_1 = require("../logger/mainLogger");
let HttpLoggerMiddleware = class HttpLoggerMiddleware {
    use = (req, res, next) => {
        const start = process.hrtime.bigint();
        res.on('finish', () => {
            const end = process.hrtime.bigint();
            const duration = Number(end - start) / 1_000_000;
            const httpLogData = {
                method: req.method,
                url: req.originalUrl,
                ip: req.ip,
                statusCode: res.statusCode,
                responseDurationMs: duration.toFixed(2),
                userAgent: req.headers['user-agent'],
            };
            if (res.statusCode >= 400) {
                mainLogger_1.logger.error(`HTTP Request: ${req.method} ${req.originalUrl} - ${res.statusCode}`, httpLogData, 'HTTP');
            }
            else {
                mainLogger_1.logger.info(`HTTP Request: ${req.method} ${req.originalUrl} - ${res.statusCode}`, httpLogData, 'HTTP');
            }
        });
        next();
    };
};
exports.HttpLoggerMiddleware = HttpLoggerMiddleware;
exports.HttpLoggerMiddleware = HttpLoggerMiddleware = __decorate([
    (0, common_1.Injectable)()
], HttpLoggerMiddleware);
//# sourceMappingURL=http-logger.middleware.js.map