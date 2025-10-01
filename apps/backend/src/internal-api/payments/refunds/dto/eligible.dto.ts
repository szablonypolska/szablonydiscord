import { IsNotEmpty } from 'class-validator';

export class EligibleDto {
  @IsNotEmpty()
  orderId: string;
}
