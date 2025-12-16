import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from './user.entity';
import { Comment } from './comment.entity';
import { Like } from './like.entity';
import { Category } from './category.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  postId: string;

  @ManyToOne(() => User, (u) => u.posts, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  imageUri: string;

  @Column({ nullable: true })
  caption: string;

  @OneToMany(() => Comment, (c) => c.post)
  comments: Comment[];

  @OneToMany(() => Like, (l) => l.post)
  likes: Like[];

  @ManyToMany(() => Category, (c) => c.posts)
  @JoinTable()
  categories: Category[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
