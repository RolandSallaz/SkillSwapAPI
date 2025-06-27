"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const ormconfig_1 = require("./ormconfig");
const config = {
    ...ormconfig_1.commonSource,
    port: parseInt(process.env.EXTERNAL_DATABASE_PORT ?? '15432'),
    synchronize: false,
};
exports.default = new typeorm_1.DataSource(config);
//# sourceMappingURL=ormconfig-migration.js.map