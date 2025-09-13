import { IsArray, ArrayNotEmpty, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoadCartDto {
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @IsArray()
  @ArrayNotEmpty()
  item: string[];
}
