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
exports.FindUserDTO = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const class_validator_1 = require("class-validator");
const users_entity_1 = require("../entities/users.entity");
const enums_1 = require("../enums");
class FindUserDTO extends (0, mapped_types_1.PartialType)(users_entity_1.User) {
    id;
    name;
    email;
    age;
    city;
    aboutMe;
    gender;
    skills;
    favoriteSkills;
    role;
}
exports.FindUserDTO = FindUserDTO;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FindUserDTO.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FindUserDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], FindUserDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.Min)(10),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], FindUserDTO.prototype, "age", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FindUserDTO.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FindUserDTO.prototype, "aboutMe", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.Gender),
    __metadata("design:type", String)
], FindUserDTO.prototype, "gender", void 0);
//# sourceMappingURL=find.users.dto.js.map