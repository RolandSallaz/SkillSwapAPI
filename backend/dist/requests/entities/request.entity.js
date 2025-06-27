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
exports.Request = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const users_entity_1 = require("../../users/entities/users.entity");
const skill_entity_1 = require("../../skills/entities/skill.entity");
const enums_1 = require("../enums");
let Request = class Request {
    id;
    createdAt;
    sender;
    receiver;
    status;
    offeredSkill;
    requestedSkill;
    isRead;
};
exports.Request = Request;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, swagger_1.ApiProperty)({
        example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
        description: 'Уникальный идентификатор заявки',
    }),
    __metadata("design:type", String)
], Request.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, swagger_1.ApiProperty)({
        example: '2024-06-24T12:00:00.000Z',
        description: 'Время создания заявки',
    }),
    __metadata("design:type", Date)
], Request.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.User, { onDelete: 'CASCADE' }),
    (0, swagger_1.ApiProperty)({
        type: () => users_entity_1.User,
        description: 'Пользователь, создавший заявку (отправитель)',
    }),
    __metadata("design:type", users_entity_1.User)
], Request.prototype, "sender", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.User, { onDelete: 'CASCADE' }),
    (0, swagger_1.ApiProperty)({
        type: () => users_entity_1.User,
        description: 'Пользователь, которому предложили (получатель)',
    }),
    __metadata("design:type", users_entity_1.User)
], Request.prototype, "receiver", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.RequestStatus,
        default: enums_1.RequestStatus.PENDING,
    }),
    (0, swagger_1.ApiProperty)({
        example: enums_1.RequestStatus.PENDING,
        enum: enums_1.RequestStatus,
        description: 'Статус заявки',
    }),
    __metadata("design:type", String)
], Request.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => skill_entity_1.Skill, { nullable: false, onDelete: 'RESTRICT' }),
    (0, swagger_1.ApiProperty)({
        type: () => skill_entity_1.Skill,
        description: 'Навык, который предлагает отправитель',
    }),
    __metadata("design:type", skill_entity_1.Skill)
], Request.prototype, "offeredSkill", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => skill_entity_1.Skill, { nullable: false, onDelete: 'RESTRICT' }),
    (0, swagger_1.ApiProperty)({
        type: () => skill_entity_1.Skill,
        description: 'Навык, который отправитель хочет получить',
    }),
    __metadata("design:type", skill_entity_1.Skill)
], Request.prototype, "requestedSkill", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    (0, swagger_1.ApiProperty)({
        example: false,
        description: 'Прочитана ли заявка получателем',
    }),
    __metadata("design:type", Boolean)
], Request.prototype, "isRead", void 0);
exports.Request = Request = __decorate([
    (0, typeorm_1.Entity)()
], Request);
//# sourceMappingURL=request.entity.js.map