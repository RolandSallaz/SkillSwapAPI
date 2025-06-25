"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_users_dto_1 = require("../../users/dto/create.users.dto");
class RegisterDto extends (0, mapped_types_1.PickType)(create_users_dto_1.CreateUsersDto, [
    'name',
    'email',
    'password',
    'age',
    'city',
    'aboutMe',
    'gender',
]) {
}
exports.RegisterDto = RegisterDto;
//# sourceMappingURL=register.auth.dto.js.map