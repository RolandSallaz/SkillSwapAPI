"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadsService = void 0;
const common_1 = require("@nestjs/common");
const sharp = require("sharp");
const path_1 = require("path");
const fs = require("node:fs");
let UploadsService = class UploadsService {
    async prepareFile(uploadedFilePath, originalFileName) {
        const uploadedFile = (0, path_1.parse)(uploadedFilePath);
        let resultFilePath = (0, path_1.join)(uploadedFile.dir, uploadedFile.name) + '_lq' + uploadedFile.ext;
        try {
            await sharp(uploadedFilePath)
                .jpeg({ quality: 100 })
                .toFile(resultFilePath);
        }
        catch {
            resultFilePath = uploadedFilePath;
        }
        if (resultFilePath !== uploadedFilePath) {
            fs.unlink(uploadedFilePath, () => { });
        }
        const resultFile = (0, path_1.parse)(resultFilePath);
        const publicUrl = `/public/uploads/${resultFile.base}`;
        return {
            publicUrl,
            fileName: resultFile.base,
            originalName: originalFileName,
        };
    }
};
exports.UploadsService = UploadsService;
exports.UploadsService = UploadsService = __decorate([
    (0, common_1.Injectable)()
], UploadsService);
//# sourceMappingURL=uploads.service.js.map