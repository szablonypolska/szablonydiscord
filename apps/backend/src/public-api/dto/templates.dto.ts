import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

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

  @ApiPropertyOptional({
    description: 'If true, return detail about templates',
    example: true,
  })
  @IsOptional()
  @IsString()
  templateDetail: string;
}
