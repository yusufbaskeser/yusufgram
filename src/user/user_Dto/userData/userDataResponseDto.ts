export class UserDataResponseDto {
  userId: number;
  username: string;
  password: string;
  email: string;
  dateOfBirth: Date;
  gender: string;
  profilePicture: string;
  bio: string;

  constructor(user: any) {
    this.userId = user.id;
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
    this.dateOfBirth = user.dateOfBirth;
    this.gender = user.gender;
    this.profilePicture = user.profilePicture;
    this.bio = user.bio;
  }
}
