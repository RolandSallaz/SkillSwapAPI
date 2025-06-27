"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const configuration_1 = require("./config/configuration");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const ormconfig_1 = require("./config/ormconfig");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const jwt_1 = require("@nestjs/jwt");
const accessToken_guard_1 = require("./auth/guards/accessToken.guard");
const winston_logger_service_1 = require("./logger/winston-logger.service");
const skills_module_1 = require("./skills/skills.module");
const uploads_module_1 = require("./uploads/uploads.module");
const requests_module_1 = require("./requests/requests.module");
const categories_module_1 = require("./categories/categories.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default],
            }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                global: true,
                useFactory: (configService) => ({
                    global: true,
                    secret: configService.get('jwt.accessTokenSecret'),
                    signOptions: {
                        expiresIn: configService.get('jwt.accessTokenSecretExpiresIn'),
                    },
                }),
            }),
            typeorm_1.TypeOrmModule.forRoot(ormconfig_1.AppDataSource.options),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            skills_module_1.SkillsModule,
            uploads_module_1.UploadsModule,
            requests_module_1.RequestsModule,
            categories_module_1.CategoriesModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, accessToken_guard_1.AccessTokenGuard, winston_logger_service_1.WinstonLoggerService],
        exports: [accessToken_guard_1.AccessTokenGuard],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map