import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyPromoCodeDto {
  @IsString()
  @IsNotEmpty()
  code: string;
}
