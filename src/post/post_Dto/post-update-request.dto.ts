import { IsString, IsOptional } from 'class-validator';

export class PostUpdateRequestDto {
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  caption?: string;
}
