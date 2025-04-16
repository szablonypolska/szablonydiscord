import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { OfferType } from 'src/types/offer.types';

export class CreatePaymentsDto {
  @IsString()
  @IsNotEmpty()
  offer: OfferType;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  code: string;
}
