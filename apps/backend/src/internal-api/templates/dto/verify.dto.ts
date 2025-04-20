import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyTemplateDto {
  @IsString()
  @IsNotEmpty()
  link: string;
}
