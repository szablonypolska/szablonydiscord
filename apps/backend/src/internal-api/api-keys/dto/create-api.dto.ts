import {
  IsNotEmpty,
  IsString,
  IsNumber,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateApiDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(14)
  @MaxLength(29)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  requestCount: number;
}
