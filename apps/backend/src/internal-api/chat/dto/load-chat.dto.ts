import { IsNotEmpty, IsString } from 'class-validator';

export class LoadChatDto {
  @IsNotEmpty()
  @IsString()
  userId: string;
}
