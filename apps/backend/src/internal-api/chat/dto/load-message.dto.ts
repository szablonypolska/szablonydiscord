import { IsNotEmpty, IsString } from 'class-validator';

export class LoadMessageDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  chatId: string;
}
