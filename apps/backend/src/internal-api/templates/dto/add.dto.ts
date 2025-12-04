import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddTemplateDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  addingUserId: string;

  @IsOptional()
  @IsBoolean()
  skipJsonStructure: boolean;
}
