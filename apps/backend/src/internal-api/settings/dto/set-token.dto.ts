import { IsNotEmpty, IsString } from 'class-validator';

export class SetTokenDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  token: string;
}
