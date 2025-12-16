import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  Req,
  Body,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentRequestDto } from './comment_Dto/CreateCommentRequestDto';
import { CommentResponseDto } from './comment_Dto/CommentResponseDto';
import { CommentResponseMessageDto } from './comment_Dto/CommentResponseMessageDto';

@Controller({path :'comment' , version : '1' })
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('posts/:postId/comments')
  async createComment(
    @Param('postId') postId: string,
    @Req() req: any,
    @Body() dto: CreateCommentRequestDto,
  ): Promise<CommentResponseDto> {
    const userId = req.user.sub;
    return this.commentService.createComment(userId, postId, dto);
  }

  @Delete('comments/:commentId')
  async deleteComment(
    @Param('commentId') commentId: string,
    @Req() req: any,
  ): Promise<CommentResponseMessageDto> {
    const userId = req.user.sub;
    return this.commentService.deleteComment(userId, commentId);
  }

  @Get('posts/:postId/comments')
  async getCommentsForPost(
    @Param('postId') postId: string,
  ): Promise<CommentResponseDto[]> {
    return this.commentService.getCommentsForPost(postId);
  }
}
