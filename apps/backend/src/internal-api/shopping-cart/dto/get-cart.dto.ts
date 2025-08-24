import { IsOptional } from 'class-validator';

export class GetCartDto {
  @IsOptional()
  userId: string;
}
