import { IsNotEmpty, IsString, ArrayNotEmpty, IsArray } from 'class-validator';
import { Transform } from 'class-transformer';

export class RefundDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  orderId: string;

  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @IsArray()
  @ArrayNotEmpty()
  orderProductIds: number[];
}
