export class LikeResponseDto {
  likeId: number;
  postId: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  constructor(
    likeId: number,
    postId: number,
    userId: number,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.likeId = likeId;
    this.postId = postId;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
