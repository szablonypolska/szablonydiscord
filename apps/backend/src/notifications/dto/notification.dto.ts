import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class NotificationDto {
  @IsString()
  @IsIn(['WARNING', 'SUCCESS', 'ERROR'])
  type: 'WARNING' | 'SUCCESS' | 'ERROR';

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}

