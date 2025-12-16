import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Post } from '../entities/post.entity';
import { Comment } from '../entities/comment.entity';
import {
  validatePostExists,
  validateCommentExists,
  validateUserIsOwnerOfComment,
} from './comment_validations/comment.validations';
import { CreateCommentRequestDto } from './comment_Dto/CreateCommentRequestDto';
import { CommentResponseDto } from './comment_Dto/CommentResponseDto';
import { CommentResponseMessageDto } from './comment_Dto/CommentResponseMessageDto';

@Injectable()
export class CommentService {
  constructor(private dataSource: DataSource) {}

  async createComment(
    userId: string,
    postId: string,
    dto: CreateCommentRequestDto,
  ): Promise<CommentResponseDto> {
    const postRepository = this.dataSource.getRepository(Post);
    const commentRepository = this.dataSource.getRepository(Comment);

    await validatePostExists(postRepository, postId);

    const newComment = commentRepository.create({
      user: { userId },
      post: { postId },
      text: dto.text,
    });

    const savedComment = await commentRepository.save(newComment);
    const commentWithUser = await commentRepository.findOne({
      where: { commentId: savedComment.commentId },
      relations: ['user'],
    });
    return new CommentResponseDto(commentWithUser);
  }

  async deleteComment(
    userId: string,
    commentId: string,
  ): Promise<CommentResponseMessageDto> {
    const commentRepository = this.dataSource.getRepository(Comment);
    const comment = await validateCommentExists(commentRepository, commentId);

    validateUserIsOwnerOfComment(userId, comment);

    await commentRepository.remove(comment);
    return new CommentResponseMessageDto('Comment deleted successfully');
  }

  async getCommentsForPost(postId: string): Promise<CommentResponseDto[]> {
    const commentRepository = this.dataSource.getRepository(Comment);
    const comments = await commentRepository.find({
      where: { post: { postId } },
      relations: ['user'],
      order: { createdAt: 'ASC' },
    });

    return comments.map((comment) => new CommentResponseDto(comment));
  }
}
