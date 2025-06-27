import { User } from 'src/users/entities/users.entity';
import { Skill } from 'src/skills/entities/skill.entity';
import { RequestStatus } from '../enums';
export declare class Request {
    id: string;
    createdAt: Date;
    sender: User;
    receiver: User;
    status: RequestStatus;
    offeredSkill: Skill;
    requestedSkill: Skill;
    isRead: boolean;
}
