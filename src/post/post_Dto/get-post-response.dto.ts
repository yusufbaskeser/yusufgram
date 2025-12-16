export class GetPostResponseDto {
  postId: string;
  userId: string;
  imageUri: string;
  caption: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    postId: string,
    userId: string,
    imageUri: string,
    caption: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.postId = postId;
    this.userId = userId;
    this.imageUri = imageUri;
    this.caption = caption;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
