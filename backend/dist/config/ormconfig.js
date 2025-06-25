"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = exports.commonSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv = require("dotenv");
const process = require("node:process");
dotenv.config();
exports.commonSource = {
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.INTERIOR_DATABASE_PORT ?? '5432'),
    username: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    database: process.env.DATABASE_NAME || 'skillswap',
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV !== 'production',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
};
exports.AppDataSource = new typeorm_1.DataSource(exports.commonSource);
//# sourceMappingURL=ormconfig.js.map