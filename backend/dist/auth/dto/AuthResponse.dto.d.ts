import { User } from 'src/users/entities/users.entity';
declare const AuthResponseDto_base: import("@nestjs/mapped-types").MappedType<Partial<User>>;
export declare class AuthResponseDto extends AuthResponseDto_base {
    message: string;
    user: User;
    accessToken: string;
    refreshToken: string;
}
export {};
