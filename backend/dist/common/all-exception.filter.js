"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const EntityNotFoundError_1 = require("typeorm/error/EntityNotFoundError");
let AllExceptionFilter = class AllExceptionFilter {
    configService;
    constructor(configService) {
        this.configService = configService;
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        if (exception instanceof EntityNotFoundError_1.EntityNotFoundError) {
            return response.status(common_1.HttpStatus.NOT_FOUND).json({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: 'Cущность не найдена',
            });
        }
        if (typeof exception === 'object' &&
            exception !== null &&
            'code' in exception &&
            exception.code === '23505') {
            return response.status(common_1.HttpStatus.CONFLICT).json({
                statusCode: common_1.HttpStatus.CONFLICT,
                message: 'Пользователь с таким email уже существует',
            });
        }
        if (exception instanceof common_1.PayloadTooLargeException ||
            (typeof exception === 'object' &&
                exception !== null &&
                'name' in exception &&
                exception.name === 'PayloadTooLargeException')) {
            return response.status(common_1.HttpStatus.PAYLOAD_TOO_LARGE).json({
                statusCode: common_1.HttpStatus.PAYLOAD_TOO_LARGE,
                message: `Вес файла не должен превышать ${this.configService.get('upload.fileSizeMax')} МБ`,
            });
        }
        const status = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const message = exception instanceof common_1.HttpException
            ? exception.getResponse()
            : 'Internal server error';
        return response.status(status).json({
            statusCode: status,
            message,
        });
    }
};
exports.AllExceptionFilter = AllExceptionFilter;
exports.AllExceptionFilter = AllExceptionFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AllExceptionFilter);
//# sourceMappingURL=all-exception.filter.js.map