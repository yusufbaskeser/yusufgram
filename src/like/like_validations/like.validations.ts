import { Post } from '../../entities/post.entity';
import { Like } from '../../entities/like.entity';
import { Repository } from 'typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';

export async function validatePostExists(
  postRepository: Repository<Post>,
  postId: string,
): Promise<Post> {
  const post = await postRepository.findOne({ where: { postId } });
  if (!post) {
    throw new NotFoundException('Post not found');
  }
  return post;
}

export async function validateUserHasNotLiked(
  likeRepository: Repository<Like>,
  userId: string,
  postId: string,
): Promise<void> {
  const existingLike = await likeRepository.findOne({
    where: { user: { userId }, post: { postId } },
  });
  if (existingLike) {
    throw new ConflictException('User has already liked this post');
  }
}

export async function validateUserHasLiked(
  likeRepository: Repository<Like>,
  userId: string,
  postId: string,
): Promise<Like> {
  const like = await likeRepository.findOne({
    where: { user: { userId }, post: { postId } },
  });
  if (!like) {
    throw new NotFoundException('Like not found');
  }
  return like;
}
