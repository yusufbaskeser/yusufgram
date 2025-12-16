import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from '../../entities/post.entity';

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
