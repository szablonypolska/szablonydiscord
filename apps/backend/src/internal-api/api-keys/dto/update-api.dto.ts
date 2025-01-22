import { IsNotEmpty, IsString, IsIn } from 'class-validator';

export class UpdateApiDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  apiKeyId: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['update', 'delete'])
  type: 'update' | 'delete';
}
