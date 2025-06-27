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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const skill_entity_1 = require("../../skills/entities/skill.entity");
const enums_1 = require("../enums");
const swagger_1 = require("@nestjs/swagger");
let User = class User {
    id;
    name;
    email;
    password;
    age;
    city;
    aboutMe;
    gender;
    skills;
    favoriteSkills;
    role;
    refreshToken;
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Уникальный идентификатор пользователя',
    }),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    (0, swagger_1.ApiProperty)({ example: 'alex', description: 'Имя пользователя' }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, swagger_1.ApiProperty)({
        example: 'alex@example.com',
        description: 'Email пользователя',
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: 30, description: 'Возраст' }),
    __metadata("design:type", Number)
], User.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: 'New York', description: 'Город' }),
    __metadata("design:type", String)
], User.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: 'О себе', description: 'Информация о себе' }),
    __metadata("design:type", String)
], User.prototype, "aboutMe", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.Gender,
    }),
    (0, swagger_1.ApiProperty)({ example: enums_1.Gender.MALE, enum: enums_1.Gender, description: 'Пол' }),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => skill_entity_1.Skill, (skill) => skill.owner),
    (0, swagger_1.ApiProperty)({ type: () => [skill_entity_1.Skill], description: 'Навыки пользователя' }),
    __metadata("design:type", Array)
], User.prototype, "skills", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => skill_entity_1.Skill, { eager: true }),
    (0, typeorm_1.JoinTable)(),
    (0, swagger_1.ApiProperty)({
        example: 'favoriteSkills',
        enum: enums_1.Gender,
        description: 'favoriteSkills',
    }),
    __metadata("design:type", Array)
], User.prototype, "favoriteSkills", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.UserRole,
        default: enums_1.UserRole.USER,
    }),
    (0, swagger_1.ApiProperty)({
        example: enums_1.UserRole.USER,
        enum: enums_1.UserRole,
        description: 'Роль пользователя',
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        nullable: true,
        default: null,
    }),
    __metadata("design:type", Object)
], User.prototype, "refreshToken", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
//# sourceMappingURL=users.entity.js.map