import { User } from '../../users/entities/users.entity';
export declare class Skill {
    id: string;
    title: string;
    description: string;
    images: string[];
    owner: User;
}
