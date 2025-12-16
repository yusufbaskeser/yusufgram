import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UserUpdateRequestDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;
}
