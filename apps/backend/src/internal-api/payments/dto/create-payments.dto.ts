import { IsNotEmpty, IsOptional, IsString, ValidateIf } from 'class-validator';
import { OfferType } from 'src/types/offer.types';

export class CreatePaymentsDto {
  @IsString()
  @IsNotEmpty()
  offer: OfferType;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsOptional()
  code: string;

  @ValidateIf((o) => o.offer === 'basic')
  @IsNotEmpty({ message: 'link is required on offer basic' })
  @IsString()
  link: string;

  @ValidateIf((o) => o.offer === 'advanced')
  @IsNotEmpty({ message: 'serverId is required on offer advanced' })
  @IsString()
  serverId: string;

  @ValidateIf((o) => o.offer === 'premium')
  @IsNotEmpty({ message: 'serverName is required on offer premium' })
  @IsString()
  serverName: string;
}
