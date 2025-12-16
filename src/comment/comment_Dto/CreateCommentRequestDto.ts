import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCommentRequestDto {
  @IsString()
  @IsNotEmpty()
  text: string;
}
