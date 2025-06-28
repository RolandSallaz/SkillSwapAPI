import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/users.entity';
import { Category } from '../../categories/entities/category.entity';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @ManyToOne(() => Category, { nullable: false })
  category: Category;

  @Column('text', { array: true, nullable: true })
  images: string[];

  @ManyToOne(() => User, (user) => user.skills, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  owner: User;
}
