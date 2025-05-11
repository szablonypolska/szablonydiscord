import { IsNotEmpty, IsString } from 'class-validator';

export class GenerateServerSchemaDto {
  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
