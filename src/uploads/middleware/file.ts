import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { mkdir } from 'fs-extra';
import { HttpException, HttpStatus } from '@nestjs/common';

const acceptedImageTypes = [
  'image/png',
  'image/jpg',
  'image/jpeg',
  'image/gif',
];

export type UploadsConfiguration = {
  dir: string;
  fileSizeMax: number;
  logError: (message: string, error: Error) => void;
};

type DestinationCallback = (error: Error | null, destination: string) => void;

export function fileInterceptor(config: UploadsConfiguration) {
  return FileInterceptor('file', {
    storage: diskStorage({
      destination: (
        _req,
        _file: Express.Multer.File,
        cb: DestinationCallback,
      ) => {
        const dirForUploading = config.dir;

        mkdir(dirForUploading, { recursive: true }, (error) => {
          if (error) {
            config.logError(
              'Ошибка создания директории для пользовательских загрузок',
              error,
            );
            return cb(error, '');
          }
          cb(null, dirForUploading);
        });
      },
      filename: (_req, file, cb) => {
        const randomName = uuidv4() + extname(file.originalname);
        cb(null, randomName);
      },
    }),
    limits: { fileSize: config.fileSizeMax },
    fileFilter: (_req, file, cb) => {
      if (!acceptedImageTypes.includes(file.mimetype)) {
        return cb(
          new HttpException('Ожидается изображение', HttpStatus.BAD_REQUEST),
          false,
        );
      }
      cb(null, true);
    },
  });
}
