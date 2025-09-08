import { Transform } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class CreatePaymentsDto {
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @IsArray()
  @ArrayNotEmpty()
  item: string[];

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsOptional()
  promoCode: string;

  
}
