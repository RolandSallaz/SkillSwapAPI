import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.auth.dto';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { RegisterDto } from './dto/register.auth.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    private readonly configService;
    private readonly saltRounds;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService);
    register(registerDto: RegisterDto): Promise<{
        message: string;
        user: {
            id: string;
            name: string;
            email: string;
            age: number;
            city: string;
            aboutMe: string;
            gender: import("../users/enums").Gender;
            skills: import("../skills/entities/skill.entity").Skill[];
            favoriteSkills: import("../skills/entities/skill.entity").Skill[];
            role: import("../users/enums").UserRole;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        user: {
            name: string;
            email: string;
            id: string;
            age: number;
            city: string;
            aboutMe: string;
            gender: import("../users/enums").Gender;
            skills: import("../skills/entities/skill.entity").Skill[];
            favoriteSkills: import("../skills/entities/skill.entity").Skill[];
            role: import("../users/enums").UserRole;
        };
        accessToken: string;
        refreshToken: string;
        message: string;
    }>;
    refresh(user: {
        id: string;
        email: string;
        role?: string;
        message?: string;
    }): Promise<{
        user: {
            name: string;
            email: string;
            id: string;
            age: number;
            city: string;
            aboutMe: string;
            gender: import("../users/enums").Gender;
            skills: import("../skills/entities/skill.entity").Skill[];
            favoriteSkills: import("../skills/entities/skill.entity").Skill[];
            role: import("../users/enums").UserRole;
        };
        accessToken: string;
        refreshToken: string;
        message: string;
    }>;
    logout(id: string): Promise<string>;
    _getTokens(user: {
        id: string;
        email: string;
        role?: string;
    }): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
