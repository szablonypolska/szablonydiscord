import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DeleteDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsNumber()
  notificationId: number;
}
