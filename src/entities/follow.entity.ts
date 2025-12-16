import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Follow {
  @PrimaryGeneratedColumn('uuid')
  followerId: string;

  @ManyToOne(() => User, (u) => u.following, { onDelete: 'CASCADE' })
  follower: User;

  @ManyToOne(() => User, (u) => u.followers, { onDelete: 'CASCADE' })
  following: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
