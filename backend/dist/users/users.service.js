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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt = require("bcrypt");
const typeorm_2 = require("typeorm");
const users_entity_1 = require("./entities/users.entity");
const config_1 = require("@nestjs/config");
let UsersService = class UsersService {
    userRepository;
    configService;
    constructor(userRepository, configService) {
        this.userRepository = userRepository;
        this.configService = configService;
    }
    async create(createUserDto) {
        const user = (await this.userRepository.save(createUserDto));
        const { password, refreshToken, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    async findAll() {
        const users = await this.userRepository.find();
        const usersWithoutPassword = users.map((user) => {
            const { password, refreshToken, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });
        return usersWithoutPassword;
    }
    async findOne(id) {
        const user = await this.userRepository.findOneByOrFail({ id });
        const { password, refreshToken, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    async updateUser(id, updateUserDto) {
        const user = await this.userRepository.findOneByOrFail({ id });
        const updatedUser = await this.userRepository.save({
            ...user,
            ...updateUserDto,
        });
        const { password, refreshToken, ...userWithoutPassword } = updatedUser;
        return userWithoutPassword;
    }
    async updatePassword(id, newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, this.configService.get('salt'));
        const user = await this.userRepository.findOneByOrFail({ id });
        const updatedUser = await this.userRepository.save({
            ...user,
            password: hashedPassword,
        });
        const { password, refreshToken, ...userWithoutPassword } = updatedUser;
        return userWithoutPassword;
    }
    async remove(id) {
        await this.userRepository.delete(id);
        return { message: `Пользователь с id ${id} удалён` };
    }
    async findByEmail(email) {
        return await this.userRepository.findOne({
            where: { email },
        });
    }
    async removeRefreshToken(id) {
        const user = await this.userRepository.findOneByOrFail({ id });
        user.refreshToken = '';
        await this.userRepository.save(user);
        return { message: `Refresh token для пользователя с id ${id} удален` };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService])
], UsersService);
//# sourceMappingURL=users.service.js.map