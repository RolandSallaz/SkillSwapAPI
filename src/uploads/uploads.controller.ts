import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { fileInterceptor, UploadsConfiguration } from './middleware/file';
import { Response } from 'express';
import { UploadsService } from './uploads.service';
import { ConfigService } from '@nestjs/config';

const uploadsConfiguration: UploadsConfiguration = {
  fileSizeMax: 0,
  dir: './public/uploads',
  logError: console.log,
};

@Controller('uploads')
export class UploadsController {
  constructor(
    private readonly uploadsService: UploadsService,
    private readonly configService: ConfigService,
  ) {
    uploadsConfiguration.dir = this.configService.get<string>(
      'upload.dir',
      './public/uploads',
    );
    uploadsConfiguration.fileSizeMax = this.configService.get<number>(
      'upload.fileSizeMax',
      2 * 1024 * 1024,
    );
    // TODO: добавить в зависимости логгер и передать сюда его функцию
    // uploadsConfiguration.logerror = this.logger.error или типа того
  }

  @Post('upload')
  @UseInterceptors(fileInterceptor(uploadsConfiguration))
  async uploadFile(
    @UploadedFile() file: { path: string; originalname: string },
    @Res() res: Response,
  ) {
    if (!file) {
      throw new HttpException('Файл не загружен', HttpStatus.BAD_REQUEST);
    }
    return res.json(
      await this.uploadsService.prepareFile(file.path, file.originalname),
    );
  }
}
