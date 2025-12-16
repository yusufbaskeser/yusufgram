import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Post } from '../entities/post.entity';
import { Comment } from '../entities/comment.entity';
import { Like } from '../entities/like.entity';
import { Device } from '../entities/device_track.entity';
import { Follow } from '../entities/follow.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Post, Comment, Like, Device, Follow]),
  ],

  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
