import { IsString, IsOptional, IsArray, IsUUID } from 'class-validator';

export class PostRequestDto {
  @IsString()
  imageUrl: string;

  @IsOptional()
  @IsString()
  caption?: string;

  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  categoryIds?: string[];
}
