import { Skill } from '../../skills/entities/skill.entity';
import { Gender, UserRole } from '../enums';
export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    age: number;
    city: string;
    aboutMe: string;
    gender: Gender;
    skills: Skill[];
    favoriteSkills: Skill[];
    role: UserRole;
    refreshToken: string | null;
}
