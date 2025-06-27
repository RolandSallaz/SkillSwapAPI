"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const config_1 = require("@nestjs/config");
const all_exception_filter_1 = require("./common/all-exception.filter");
const winston_logger_service_1 = require("./logger/winston-logger.service");
const mainLogger_1 = require("./logger/mainLogger");
const http_logger_middleware_1 = require("./logger/http-logger.middleware");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: new winston_logger_service_1.WinstonLoggerService(),
    });
    const configService = app.get(config_1.ConfigService);
    app.use(cookieParser());
    app.useGlobalFilters(new all_exception_filter_1.AllExceptionFilter(configService));
    app.use(new http_logger_middleware_1.HttpLoggerMiddleware().use);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('SkillSwap API')
        .setDescription('API')
        .setVersion('1.0')
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access-token')
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'refresh-token')
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/doc', app, documentFactory);
    const port = configService.get('port');
    await app.listen(port);
    mainLogger_1.logger.info(`app listen port: ${port}`);
}
bootstrap().catch((err) => {
    mainLogger_1.logger.error(err);
    process.exit(1);
});
//# sourceMappingURL=main.js.map