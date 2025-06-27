"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.acceptedImageTypes = void 0;
exports.createMulterConfig = createMulterConfig;
const multer_1 = require("multer");
const uuid_1 = require("uuid");
const path_1 = require("path");
const common_1 = require("@nestjs/common");
exports.acceptedImageTypes = [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'image/gif',
];
function createMulterConfig(config) {
    return {
        storage: (0, multer_1.diskStorage)({
            destination: config.get('upload.dir', './public/uploads'),
            filename: (_req, file, cb) => {
                const uniqueName = (0, uuid_1.v4)() + (0, path_1.extname)(file.originalname);
                cb(null, uniqueName);
            },
        }),
        limits: {
            fileSize: config.get('upload.fileSizeMax', 2 * 1024 * 1024),
        },
        fileFilter: (_req, file, cb) => {
            if (!exports.acceptedImageTypes.includes(file.mimetype)) {
                return cb(new common_1.HttpException('Ожидается изображение', common_1.HttpStatus.BAD_REQUEST), false);
            }
            cb(null, true);
        },
    };
}
//# sourceMappingURL=uploads.config.js.map