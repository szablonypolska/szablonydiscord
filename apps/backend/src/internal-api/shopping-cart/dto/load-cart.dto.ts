import { IsArray, ArrayNotEmpty, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';

const OFFER_TYPE_VALUES = ['basic', 'premium', 'advanced', 'upgrade'] as const;
type OfferType = (typeof OFFER_TYPE_VALUES)[number];

export class LoadCartDto {
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @IsArray()
  @ArrayNotEmpty()
  @IsIn(OFFER_TYPE_VALUES, { each: true })
  item: OfferType[];
}
