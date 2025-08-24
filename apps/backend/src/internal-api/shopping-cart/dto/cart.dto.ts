import { IsEnum, IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { OfferType } from 'src/types/offer.types';

const OFFER_TYPE_VALUES: OfferType[] = [
  'basic',
  'premium',
  'advanced',
  'upgrade',
];

export class CartDto {
  @IsNotEmpty()
  @IsEnum(OFFER_TYPE_VALUES)
  itemId: OfferType;

  @IsOptional()
  userId: string;
}
