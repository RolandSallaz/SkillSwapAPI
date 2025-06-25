import { CreateUsersDto } from 'src/users/dto/create.users.dto';
declare const RegisterDto_base: import("@nestjs/mapped-types").MappedType<Pick<CreateUsersDto, "name" | "email" | "password" | "age" | "city" | "aboutMe" | "gender">>;
export declare class RegisterDto extends RegisterDto_base {
}
export {};
