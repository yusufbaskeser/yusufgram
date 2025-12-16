import { Repository } from 'typeorm';
import { Post } from '../../entities/post.entity';
import { Comment } from '../../entities/comment.entity';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

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

export async function validateCommentExists(
  commentRepository: Repository<Comment>,
  commentId: string,
): Promise<Comment> {
  const comment = await commentRepository.findOne({
    where: { commentId },
    relations: ['user'],
  });
  if (!comment) {
    throw new NotFoundException('Comment not found');
  }
  return comment;
}

export function validateUserIsOwnerOfComment(
  userId: string,
  comment: Comment,
): void {
  if (comment.user.userId !== userId) {
    throw new UnauthorizedException('User is not the owner of the comment');
  }
}
