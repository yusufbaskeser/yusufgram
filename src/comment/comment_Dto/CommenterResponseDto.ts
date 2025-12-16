export class CommenterResponseDto {
  userId: string;
  username: string;
  profilePicture: string;

  constructor(user: any) {
    this.userId = user.userId;
    this.username = user.username;
    this.profilePicture = user.profilePicture;
  }
}
