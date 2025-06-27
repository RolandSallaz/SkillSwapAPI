import { ConfigService } from '@nestjs/config';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
export declare const acceptedImageTypes: string[];
export declare function createMulterConfig(config: ConfigService): MulterOptions;
