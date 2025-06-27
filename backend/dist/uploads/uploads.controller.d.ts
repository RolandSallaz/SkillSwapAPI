import { Response } from 'express';
import { UploadsService } from './uploads.service';
export declare class UploadsController {
    private readonly uploadsService;
    constructor(uploadsService: UploadsService);
    uploadImageFile(file: {
        path: string;
        originalname: string;
    }, res: Response): Promise<Response<any, Record<string, any>>>;
}
