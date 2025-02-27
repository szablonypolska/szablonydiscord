import { IsNumber, IsOptional } from 'class-validator';

export class TemplatesDto {
  @IsOptional()
  page: string;

  @IsOptional()
  pageSize: string;
}
