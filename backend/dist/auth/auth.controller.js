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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const login_auth_dto_1 = require("./dto/login.auth.dto");
const AuthResponse_dto_1 = require("./dto/AuthResponse.dto");
const refreshToken_guard_1 = require("./guards/refreshToken.guard");
const accessToken_guard_1 = require("./guards/accessToken.guard");
const register_auth_dto_1 = require("./dto/register.auth.dto");
const swagger_1 = require("@nestjs/swagger");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    register(registerDto) {
        return this.authService.register(registerDto);
    }
    login(loginDto) {
        return this.authService.login(loginDto);
    }
    refresh(req) {
        return this.authService.refresh({
            id: req.user.sub,
            email: req.user.email,
            role: req.user.role,
        });
    }
    logout(req) {
        return this.authService.logout(req.user.sub);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({ summary: 'Регистрация пользователя' }),
    (0, swagger_1.ApiBody)({
        description: 'Данные для регистрации пользователя',
        schema: {
            example: {
                name: 'Александр',
                email: 'alex@email.com',
                password: 'password',
                age: 27,
                city: 'Москва',
                aboutMe: 'Я',
                gender: 'Ж',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Успешная регистрация',
        type: AuthResponse_dto_1.AuthResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_auth_dto_1.RegisterDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({
        summary: 'Авторизация пользователя',
        description: 'ЛОГИН И ПАРОЛЬ ДОЛЖНЫ БЫТЬ ТАКИМИ ЖЕ, КАК ПРИ РЕГИСТРАЦИИ',
    }),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiBody)({
        description: 'Данные для авторизации',
        type: login_auth_dto_1.LoginDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Успешная авторизация',
        type: AuthResponse_dto_1.AuthResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_auth_dto_1.LoginDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(refreshToken_guard_1.RefreshTokenGuard),
    (0, common_1.Post)('refresh'),
    (0, swagger_1.ApiBearerAuth)('refresh-token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Обновление токенов',
        description: 'Используется для получения новых токенов доступа и обновления refresh токена',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Успешное обновление токенов',
        type: AuthResponse_dto_1.AuthResponseDto,
    }),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, common_1.UseGuards)(accessToken_guard_1.AccessTokenGuard),
    (0, common_1.Post)('logout'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Выход из системы',
        description: 'Удаляет refresh токен пользователя и завершает сессию',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Успешный выход из системы',
        schema: {
            example: {
                message: 'Пользователь с id e59c23dc-b405-4eae-9bae-c8e3a2078d44 вышёл из системы',
            },
        },
    }),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map