import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class TemplatesDto {
  @ApiPropertyOptional({
    description: 'Number page, default 1',
    example: 1,
  })
  @IsOptional()
  page: string;

  @ApiPropertyOptional({
    description: 'Optional pageSize templates, default 25',
    example: 25,
  })
  @IsOptional()
  pageSize: string;
}
