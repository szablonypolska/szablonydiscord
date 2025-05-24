import { IsNotEmpty, IsString } from 'class-validator';

export class GenerateServerSchemaDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
