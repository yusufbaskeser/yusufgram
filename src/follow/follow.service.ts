import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { Follow } from '../entities/follow.entity';
import {
  validateUserExists,
  validateUsersAreNotSame,
  validateFollowDoesNotExist,
  validateFollowExists,
} from './follow_validations/follow.validations';
import { FollowerResponseDto } from './follow_Dto/FollowerResponseDto';
import { FollowResponseMessageDto } from './follow_Dto/FollowResponseMessageDto';

@Injectable()
export class FollowService {
  constructor(private dataSource: DataSource) {}

  async followUser(
    followerId: string,
    followingId: string,
  ): Promise<FollowResponseMessageDto> {
    const userRepository = this.dataSource.getRepository(User);
    const followRepository = this.dataSource.getRepository(Follow);

    await validateUserExists(userRepository, followingId);
    validateUsersAreNotSame(followerId, followingId);
    await validateFollowDoesNotExist(followRepository, followerId, followingId);

    const newFollow = followRepository.create({
      follower: { userId: followerId },
      following: { userId: followingId },
    });

    await followRepository.save(newFollow);
    return new FollowResponseMessageDto('User followed successfully');
  }

  async unfollowUser(
    followerId: string,
    followingId: string,
  ): Promise<FollowResponseMessageDto> {
    const followRepository = this.dataSource.getRepository(Follow);

    const follow = await validateFollowExists(
      followRepository,
      followerId,
      followingId,
    );
    await followRepository.remove(follow);
    return new FollowResponseMessageDto('User unfollowed successfully');
  }

  async getFollowers(userId: string): Promise<FollowerResponseDto[]> {
    const followRepository = this.dataSource.getRepository(Follow);
    const follows = await followRepository.find({
      where: { following: { userId } },
      relations: ['follower'],
    });

    return follows.map((follow) => new FollowerResponseDto(follow.follower));
  }

  async getFollowing(userId: string): Promise<FollowerResponseDto[]> {
    const followRepository = this.dataSource.getRepository(Follow);
    const follows = await followRepository.find({
      where: { follower: { userId } },
      relations: ['following'],
    });

    return follows.map((follow) => new FollowerResponseDto(follow.following));
  }
}
