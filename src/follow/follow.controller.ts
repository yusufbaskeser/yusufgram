import { Controller, Post, Delete, Get, Param, Req } from '@nestjs/common';
import { FollowService } from './follow.service';
import { FollowerResponseDto } from './follow_Dto/FollowerResponseDto';
import { FollowResponseMessageDto } from './follow_Dto/FollowResponseMessageDto';

@Controller({path :'follow' , version : '1' })
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post(':userId/follow')
  async follow(
    @Param('userId') followingId: string,
    @Req() req: any,
  ): Promise<FollowResponseMessageDto> {
    const followerId = req.user.sub;
    return this.followService.followUser(followerId, followingId);
  }

  @Delete(':userId/follow')
  async unfollow(
    @Param('userId') followingId: string,
    @Req() req: any,
  ): Promise<FollowResponseMessageDto> {
    const followerId = req.user.sub;
    return this.followService.unfollowUser(followerId, followingId);
  }

  @Get(':userId/followers')
  async getFollowers(
    @Param('userId') userId: string,
  ): Promise<FollowerResponseDto[]> {
    return this.followService.getFollowers(userId);
  }

  @Get(':userId/following')
  async getFollowing(
    @Param('userId') userId: string,
  ): Promise<FollowerResponseDto[]> {
    return this.followService.getFollowing(userId);
  }
}
