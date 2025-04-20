import { IsNotEmpty, IsString } from 'class-validator';
import { OfferType } from 'src/types/offer.types';

export class VerifyPaymentsSessionDto {
  @IsString()
  @IsNotEmpty()
  sessionId: OfferType;
}
