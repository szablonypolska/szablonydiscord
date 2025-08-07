import { IsNotEmpty, IsString } from 'class-validator';

export class AddTemplateDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  addingUserId: string;
}
