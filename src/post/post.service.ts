import { Inject, Injectable } from '@nestjs/common';
import { PostRequestDto } from './post_Dto/post-request.dto';
import { PostUpdateRequestDto } from './post_Dto/post-update-request.dto';
import { PostResponseMessageDto } from './post_Dto/post-response-message.dto';
import { DataSource, In } from 'typeorm';
import { Post } from '../entities/post.entity';
import { validatePostExists } from './post_validations/post.validations';
import { GetPostResponseDto } from './post_Dto/get-post-response.dto';
import { Category } from '../entities/category.entity';
import { Follow } from '../entities/follow.entity';
import { InjectRedis } from '@nestjs-modules/ioredis';

import Redis from 'ioredis';

@Injectable()
export class PostService {
  constructor(
    private dataSource: DataSource,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async getAllPosts(skip: number,
  limit: number): Promise<GetPostResponseDto[]> {
    const postRepository = this.dataSource.getRepository(Post);

    const posts = await postRepository.find({
      relations: ['user'],
      skip,
    take: limit,
    order: {
      createdAt: 'DESC',
    },
    });

    return posts.map(
      (post) =>
        new GetPostResponseDto(
          post.postId,
          post.user.userId,
          post.imageUri,
          post.caption,
          post.createdAt,
          post.updatedAt,
        ),
    );
  }

  async getPostById(postId: string): Promise<GetPostResponseDto | null> {
    const postRepository = this.dataSource.getRepository(Post);

    const post = await postRepository.findOne({
      where: { postId },
      relations: ['user'],
    });

    if (!post) return null;

    return new GetPostResponseDto(
      post.postId,
      post.user.userId,
      post.imageUri,
      post.caption,
      post.createdAt,
      post.updatedAt,
    );
  }

  async createPost(
    dto: PostRequestDto,
    user: any,
  ): Promise<PostResponseMessageDto> {
    const postRepository = this.dataSource.getRepository(Post);
    let categories: Category[] = [];

    if (dto.categoryIds && dto.categoryIds.length > 0) {
      const categoryRepository = this.dataSource.getRepository(Category);
      categories = await categoryRepository.findBy({
        categoryId: In(dto.categoryIds),
      });
    }

    const post = postRepository.create({
      imageUri: dto.imageUrl,
      caption: dto.caption || '',
      user: { userId: user.sub } as any,
      categories: categories,
    });

    await postRepository.save(post);

    return new PostResponseMessageDto('Post created successfully');
  }

  async getPostsByUser(userId: string): Promise<GetPostResponseDto[]> {
    const postRepository = this.dataSource.getRepository(Post);

    const posts = await postRepository.find({
      where: { user: { userId } },
      relations: ['user'],
    });

    return posts.map(
      (post) =>
        new GetPostResponseDto(
          post.postId,
          post.user.userId,
          post.imageUri,
          post.caption,
          post.createdAt,
          post.updatedAt,
        ),
    );
  }

  async updatePost(
    postId: string,
    dto: PostUpdateRequestDto,
  ): Promise<PostResponseMessageDto> {
    const postRepository = this.dataSource.getRepository(Post);

    const post = await validatePostExists(postRepository, postId);

    if (dto.imageUrl) post.imageUri = dto.imageUrl;
    if (dto.caption) post.caption = dto.caption;

    await postRepository.save(post);

    return new PostResponseMessageDto('Post updated successfully');
  }

  async deletePost(postId: string): Promise<PostResponseMessageDto> {
    const postRepository = this.dataSource.getRepository(Post);

    const post = await validatePostExists(postRepository, postId);

    await postRepository.remove(post);

    return new PostResponseMessageDto('Post deleted successfully');
  }

  async getFeed(skip: number,
  limit: number): Promise<GetPostResponseDto[]> {
    const postRepository = this.dataSource.getRepository(Post);

    const posts = await postRepository.find({
      relations: ['user'],
      skip,
    take: limit,
    order: {
      createdAt: 'DESC',
    },
    });

    return posts.map(
      (post) =>
        new GetPostResponseDto(
          post.postId,
          post.user.userId,
          post.imageUri,
          post.caption,
          post.createdAt,
          post.updatedAt,
        ),
    );
  }
  async redisPingTest() {
    const pong = await this.redis.ping();
    return pong;
  }
}
