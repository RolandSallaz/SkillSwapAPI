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
exports.UploadedImageFileDTO = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class UploadedImageFileDTO {
    publicUrl;
    fileName;
    originalName;
}
exports.UploadedImageFileDTO = UploadedImageFileDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        example: '/public/uploads/c29af17d-1ac7-41d9-a48b-0407c9a60cc4_lq.jpg',
        description: 'Публичная ссылка на загруженное обработанное изображение',
    }),
    __metadata("design:type", String)
], UploadedImageFileDTO.prototype, "publicUrl", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        example: 'c29af17d-1ac7-41d9-a48b-0407c9a60cc4_lq.jpg',
        description: 'Имя результирующего обработанного файла',
    }),
    __metadata("design:type", String)
], UploadedImageFileDTO.prototype, "fileName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        example: 'Original.jpg',
        description: 'Имя исходного файла',
    }),
    __metadata("design:type", String)
], UploadedImageFileDTO.prototype, "originalName", void 0);
//# sourceMappingURL=upload.image.file.dto.js.map