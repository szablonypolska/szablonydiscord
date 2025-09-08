import { Transform } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
} from 'class-validator';

enum PromoCodeType {
  PERCENTAGE = 'PERCENTAGE',
  AMOUNT = 'AMOUNT',
}

enum PromoCodeScope {
  CART = 'CART',
  PRODUCT = 'PRODUCT',
}

export class CreatePromoCodeDto {
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @IsArray()
  @ArrayNotEmpty()
  item: string[];

  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(PromoCodeScope))
  scope: "CART" | "PRODUCT";

  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(PromoCodeType))
  type: "PERCENTAGE" | "AMOUNT";

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  maxUsageCount: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  discount: number;
}
