import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class SettingsTemplateDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsBoolean()
  templatesDetail: boolean;

  @IsNotEmpty()
  @IsBoolean()
  monitoring: boolean;
}
