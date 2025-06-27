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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const common_2 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const bcrypt = require("bcrypt");
const uuid_1 = require("uuid");
let AuthService = class AuthService {
    usersService;
    jwtService;
    configService;
    saltRounds;
    constructor(usersService, jwtService, configService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.saltRounds = this.configService.get('salt');
    }
    async register(registerDto) {
        const hashedPassword = await bcrypt.hash(registerDto.password, this.saltRounds);
        const id = (0, uuid_1.v4)();
        const tokens = await this._getTokens({
            id,
            email: registerDto.email,
        });
        const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, this.saltRounds);
        const newUser = await this.usersService.create({
            ...registerDto,
            password: hashedPassword,
            id,
            refreshToken: hashedRefreshToken,
        });
        return {
            message: 'Регистрация прошла успешно',
            user: newUser,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        };
    }
    async login(loginDto) {
        const user = await this.usersService.findByEmail(loginDto.email);
        if (!user) {
            throw new common_1.NotFoundException('Пользователь не найден');
        }
        const passwordMatch = await bcrypt.compare(loginDto.password, user.password);
        if (!passwordMatch) {
            throw new common_2.UnauthorizedException('Неверный email или пароль');
        }
        return await this.refresh({
            message: 'Авторизация прошла успешно',
            id: user.id,
            email: user.email,
            role: user.role,
        });
    }
    async refresh(user) {
        const tokens = await this._getTokens(user);
        const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, this.saltRounds);
        const updatedUser = await this.usersService.updateUser(user.id, {
            refreshToken: hashedRefreshToken,
        });
        return {
            message: user.message || 'Рефреш токена прошёл успешно',
            ...tokens,
            user: updatedUser,
        };
    }
    async logout(id) {
        await this.usersService.removeRefreshToken(id);
        return 'Пользователь успешно вышел из системы';
    }
    async _getTokens(user) {
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role || 'user',
        };
        const accessToken = await this.jwtService.signAsync(payload);
        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.get('jwt.refreshTokenSecret'),
            expiresIn: this.configService.get('jwt.refreshTokenExpiresIn'),
        });
        return {
            accessToken,
            refreshToken,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map