import { CommenterResponseDto } from './CommenterResponseDto';

export class CommentResponseDto {
  commentId: string;
  text: string;
  createdAt: Date;
  user: CommenterResponseDto;

  constructor(comment: any) {
    this.commentId = comment.commentId;
    this.text = comment.text;
    this.createdAt = comment.createdAt;
    this.user = new CommenterResponseDto(comment.user);
  }
}
