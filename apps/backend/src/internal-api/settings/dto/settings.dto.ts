import { IsNotEmpty, IsString } from 'class-validator';

export class SettingsDto {
  @IsNotEmpty()
  @IsString()
  userId: string;
}
