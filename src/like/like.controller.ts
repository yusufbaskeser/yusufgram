import { Controller, Post, Delete, Get, Param, Req } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeResponseMessageDto } from './like_Dto/like-response-message.dto';

@Controller({path :'like' , version : '1' })
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post(':postId/like')
  async like(
    @Param('postId') postId: string,
    @Req() req: any,
  ): Promise<LikeResponseMessageDto> {
    return this.likeService.like(req.user.sub, postId);
  }

  @Delete(':postId/like')
  async unlike(
    @Param('postId') postId: string,
    @Req() req: any,
  ): Promise<LikeResponseMessageDto> {
    return this.likeService.unlike(req.user.sub, postId);
  }

  @Get(':postId/likes')
  async getLikes(@Param('postId') postId: string): Promise<{ count: number }> {
    return this.likeService.getLikes(postId);
  }
}
