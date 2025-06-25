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
exports.CreateUsersDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const class_validator_1 = require("class-validator");
const users_entity_1 = require("../entities/users.entity");
const enums_1 = require("../enums");
const swagger_1 = require("@nestjs/swagger");
class CreateUsersDto extends (0, mapped_types_1.PartialType)(users_entity_1.User) {
    id;
    name;
    email;
    password;
    age;
    city;
    aboutMe;
    gender;
    refreshToken;
}
exports.CreateUsersDto = CreateUsersDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Уникальный идентификатор пользователя',
    }),
    __metadata("design:type", String)
], CreateUsersDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ example: 'alex', description: 'Имя пользователя' }),
    __metadata("design:type", String)
], CreateUsersDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, swagger_1.ApiProperty)({
        example: 'alex@example.com',
        description: 'Email пользователя',
    }),
    __metadata("design:type", String)
], CreateUsersDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ example: 'qwert', description: 'Пароль' }),
    __metadata("design:type", String)
], CreateUsersDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.Min)(10),
    (0, class_validator_1.Max)(100),
    (0, swagger_1.ApiProperty)({ example: 30, description: 'Возраст' }),
    __metadata("design:type", Number)
], CreateUsersDto.prototype, "age", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ example: 'New York', description: 'Город' }),
    __metadata("design:type", String)
], CreateUsersDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ example: 'О себе', description: 'Информация о себе' }),
    __metadata("design:type", String)
], CreateUsersDto.prototype, "aboutMe", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.Gender),
    (0, swagger_1.ApiProperty)({ example: enums_1.Gender.MALE, enum: enums_1.Gender, description: 'Пол' }),
    __metadata("design:type", String)
], CreateUsersDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ example: 'refresh_token_value', description: 'Refresh Token' }),
    __metadata("design:type", String)
], CreateUsersDto.prototype, "refreshToken", void 0);
//# sourceMappingURL=create.users.dto.js.map