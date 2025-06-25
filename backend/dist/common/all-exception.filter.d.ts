import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
export declare class AllExceptionFilter implements ExceptionFilter {
    private readonly configService;
    constructor(configService: ConfigService);
    catch(exception: unknown, host: ArgumentsHost): Response<any, Record<string, any>>;
}
