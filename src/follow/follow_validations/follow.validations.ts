import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { Follow } from '../../entities/follow.entity';
import {
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

export async function validateUserExists(
  userRepository: Repository<User>,
  userId: string,
): Promise<User> {
  const user = await userRepository.findOne({ where: { userId } });
  if (!user) {
    throw new NotFoundException('User not found');
  }
  return user;
}

export function validateUsersAreNotSame(
  followerId: string,
  followingId: string,
): void {
  if (followerId === followingId) {
    throw new BadRequestException('Users cannot follow themselves');
  }
}

export async function validateFollowDoesNotExist(
  followRepository: Repository<Follow>,
  followerId: string,
  followingId: string,
): Promise<void> {
  const follow = await followRepository.findOne({
    where: {
      follower: { userId: followerId },
      following: { userId: followingId },
    },
  });
  if (follow) {
    throw new ConflictException('User is already being followed');
  }
}

export async function validateFollowExists(
  followRepository: Repository<Follow>,
  followerId: string,
  followingId: string,
): Promise<Follow> {
  const follow = await followRepository.findOne({
    where: {
      follower: { userId: followerId },
      following: { userId: followingId },
    },
  });
  if (!follow) {
    throw new NotFoundException('Follow relationship not found');
  }
  return follow;
}
