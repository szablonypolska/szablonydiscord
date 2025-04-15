import { IsNotEmpty, IsString } from 'class-validator';
import { OfferType } from 'src/types/offer.types';

export class VerifyPromoCodeDto {
  @IsString()
  @IsNotEmpty()
  offer: OfferType;

  @IsString()
  @IsNotEmpty()
  code: string;
}
