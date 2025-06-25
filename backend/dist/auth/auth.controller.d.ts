import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.auth.dto';
import { RegisterDto } from './dto/register.auth.dto';
import { AuthRequest } from './types';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    refresh(req: AuthRequest): Promise<{
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
    logout(req: AuthRequest): Promise<string>;
}
