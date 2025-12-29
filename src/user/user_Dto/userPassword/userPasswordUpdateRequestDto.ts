import { IsString, MinLength } from 'class-validator';

export class UserPasswordUpdateRequestDto {
  @IsString()
  oldPassword: string;

  @IsString()
  @MinLength(6)
  newPassword: string;
}