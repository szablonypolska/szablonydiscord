import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { TemplatesService } from './services/templates.service';
import { AuthGuard } from './guard/auth.guard';
import { TemplatesDto } from './dto/templates.dto';
import { TemplatesData } from './interfaces/templates.interface';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';

@Controller('api')
@UseGuards(AuthGuard)
@ApiTags('Templates')
@ApiSecurity('x-api-key')
export class PublicController {
  constructor(private readonly template: TemplatesService) {}

  @Get('templates')
  @ApiOperation({ summary: 'Get all templates' })
  getTemplates(@Query() templatesDto: TemplatesDto): Promise<TemplatesData> {
    return this.template.getTemplates(templatesDto);
  }
}
