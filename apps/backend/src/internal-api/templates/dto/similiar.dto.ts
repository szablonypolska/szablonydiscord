import { IsString, IsNotEmpty } from 'class-validator';

export class SimiliarDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}
