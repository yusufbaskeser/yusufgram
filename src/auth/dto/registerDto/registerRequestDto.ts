import { IsString, IsEmail, IsDateString } from 'class-validator';

export class RegisterRequestDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;

  @IsDateString()
  dateOfBirth: string;

  @IsString()
  gender: string;
}
