import { IsBoolean, IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

export class ReadDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ValidateIf((o) => !o.all)
  @IsNotEmpty()
  @IsNumber()
  notificationId: number;

  @ValidateIf((o) => !o.notificationId)
  @IsNotEmpty()
  @IsBoolean()
  all: boolean;
}
