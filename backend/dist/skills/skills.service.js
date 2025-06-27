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
exports.SkillsService = void 0;
const common_1 = require("@nestjs/common");
const node_fs_1 = require("node:fs");
const path = require("path");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const skill_entity_1 = require("./entities/skill.entity");
let SkillsService = class SkillsService {
    skillRepository;
    constructor(skillRepository) {
        this.skillRepository = skillRepository;
    }
    async create(userId, createSkillDto) {
        return await this.skillRepository.save({
            ...createSkillDto,
            owner: { id: userId },
        });
    }
    async find(query) {
        const page = Math.max(parseInt(query.page ?? '1'), 1);
        const limit = Math.min(Math.max(parseInt(query.limit ?? '20'), 1), 100);
        const search = (query.search || '').trim().toLowerCase();
        const qb = this.skillRepository.createQueryBuilder('skill');
        if (search) {
            qb.where('LOWER(skill.title) LIKE :search', { search: `%${search}%` });
        }
        const [skills, total] = await qb
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();
        const totalPages = Math.ceil(total / limit);
        if (page > totalPages && totalPages !== 0) {
            throw new common_1.NotFoundException('Page not found');
        }
        return {
            data: skills,
            page,
            totalPages,
        };
    }
    async update(userId, id, updateSkillDto) {
        const skill = await this.userIsOwner(id, userId);
        return await this.skillRepository.save({
            ...skill,
            ...updateSkillDto,
        });
    }
    async remove(id, userId) {
        const skill = await this.userIsOwner(id, userId);
        skill.images.forEach((image) => {
            const relativePath = image.startsWith('/') ? image.slice(1) : image;
            const absolutePath = path.join(process.cwd(), relativePath);
            (0, node_fs_1.unlink)(absolutePath, (err) => {
                if (err) {
                    console.error(`Ошибка при удалении файла ${absolutePath}:`, err);
                }
            });
        });
        await this.skillRepository.delete(id);
        return `Skill with id ${id} has been removed`;
    }
    async userIsOwner(id, userId) {
        const skill = await this.skillRepository.findOneByOrFail({ id });
        if (skill.owner.id !== userId) {
            throw new common_1.ForbiddenException('Недостаточно прав');
        }
        return skill;
    }
};
exports.SkillsService = SkillsService;
exports.SkillsService = SkillsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(skill_entity_1.Skill)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SkillsService);
//# sourceMappingURL=skills.service.js.map