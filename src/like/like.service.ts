import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Like } from '../entities/like.entity';
import { Post } from '../entities/post.entity';
import {
  validatePostExists,
  validateUserHasLiked,
  validateUserHasNotLiked,
} from './like_validations/like.validations';
import { LikeResponseMessageDto } from './like_Dto/like-response-message.dto';

@Injectable()
export class LikeService {
  constructor(private dataSource: DataSource) {}

  async like(userId: string, postId: string): Promise<LikeResponseMessageDto> {
    const likeRepository = this.dataSource.getRepository(Like);
    const postRepository = this.dataSource.getRepository(Post);

    await validatePostExists(postRepository, postId);
    await validateUserHasNotLiked(likeRepository, userId, postId);

    const newLike = likeRepository.create({
      user: { userId },
      post: { postId },
    });

    await likeRepository.save(newLike);

    return new LikeResponseMessageDto('Post liked successfully');
  }

  async unlike(
    userId: string,
    postId: string,
  ): Promise<LikeResponseMessageDto> {
    const likeRepository = this.dataSource.getRepository(Like);

    const like = await validateUserHasLiked(likeRepository, userId, postId);
    await likeRepository.remove(like);

    return new LikeResponseMessageDto('Post unliked successfully');
  }

  async getLikes(postId: string): Promise<{ count: number }> {
    const likeRepository = this.dataSource.getRepository(Like);
    const count = await likeRepository.count({ where: { post: { postId } } });
    return { count };
  }
}
