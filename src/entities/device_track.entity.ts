import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Device {
  @PrimaryGeneratedColumn('uuid')
  deviceId: string;

  @ManyToOne(() => User, (u) => u.devices, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  deviceType: string;

  @Column()
  modelName: string;

  @Column({ nullable: true })
  lastUsedAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
