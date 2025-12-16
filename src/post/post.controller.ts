import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Req,
  Query
} from '@nestjs/common';

import { PostService } from './post.service';
import { PostRequestDto } from './post_Dto/post-request.dto';
import { PostUpdateRequestDto } from './post_Dto/post-update-request.dto';
import { GetPostResponseDto } from './post_Dto/get-post-response.dto';
import { PostResponseMessageDto } from './post_Dto/post-response-message.dto';

@Controller({path :'posts' , version : '1' })
export class PostsController {
  constructor(private readonly postService: PostService) {}

   @Get()
  getFeed(
  @Query('skip') skip = '0',
  @Query('limit') limit = '10',
): Promise<GetPostResponseDto[]> {
    return this.postService.getAllPosts( 
    Number(skip),
    Number(limit));
  }

  @Get()
  getAllPosts(
  @Query('skip') skip = '0',
  @Query('limit') limit = '10',
): Promise<GetPostResponseDto[]> {
    return this.postService.getAllPosts( 
    Number(skip),
    Number(limit));
  }

  @Post()
  createPost(
    @Body() dto: PostRequestDto,
    @Req() req: any,
  ): Promise<PostResponseMessageDto> {
    return this.postService.createPost(dto, req.user);
  }

  @Get(':userId/posts')
  getPostsByUser(
    @Param('userId') userId: string,
  ): Promise<GetPostResponseDto[]> {
    return this.postService.getPostsByUser(userId);
  }

  @Get('redis-ping')
  async redisPing() {
    return this.postService.redisPingTest();
  }

  @Get(':postId')
  getPostById(
    @Param('postId') postId: string,
  ): Promise<GetPostResponseDto | null> {
    return this.postService.getPostById(postId);
  }

  @Put(':postId')
  updatePost(
    @Param('postId') postId: string,
    @Body() dto: PostUpdateRequestDto,
  ): Promise<PostResponseMessageDto> {
    return this.postService.updatePost(postId, dto);
  }

  @Delete(':postId')
  deletePost(@Param('postId') postId: string): Promise<PostResponseMessageDto> {
    return this.postService.deletePost(postId);
  }
}
