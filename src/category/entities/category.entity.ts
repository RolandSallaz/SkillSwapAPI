import { ApiProperty } from "@nestjs/swagger";
import { 
    Column, 
    Entity, 
    ManyToOne, 
    OneToMany, 
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({
        example: 1,
        description: 'Уникальный идентификатор',
    })
    id?: string;

    @Column({ 
        length: 100,
    })
    @ApiProperty({ 
        example: 'alex', 
        description: 'Имя пользователя',
    })
    name: string;

    @ManyToOne(() => Category, category => category.children, { 
        nullable: true,
        onDelete: 'SET NULL'
    })
    parent?: Category | null;

    @OneToMany(() => Category, category => category.parent, {
        cascade: true
    })
    children?: Category[];
}