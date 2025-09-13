import { IsNotEmpty, IsOptional } from 'class-validator';

export class CartDto {
  @IsNotEmpty()
  itemId: string;

  @IsOptional()
  userId: string;

  @IsOptional()
  reset: boolean;
}
