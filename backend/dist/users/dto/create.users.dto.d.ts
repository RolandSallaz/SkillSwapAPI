import { User } from '../entities/users.entity';
import { Gender } from '../enums';
declare const CreateUsersDto_base: import("@nestjs/mapped-types").MappedType<Partial<User>>;
export declare class CreateUsersDto extends CreateUsersDto_base {
    id: string;
    name: string;
    email: string;
    password: string;
    age: number;
    city: string;
    aboutMe: string;
    gender: Gender;
    refreshToken: string;
}
export {};
