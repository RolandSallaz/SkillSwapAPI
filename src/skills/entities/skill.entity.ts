import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/users.entity';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  // @Column()
  // category: string;

  @Column('text', { array: true, nullable: true })
  images: string[];

  @ManyToOne(() => User, (user) => user.skills, {
    nullable: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  owner: User;
}
