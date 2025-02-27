import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { TemplatesService } from './services/templates.service';
import { AuthGuard } from './guard/auth.guard';
import { TemplatesDto } from './dto/templates.dto';
import { TemplatesData } from './interfaces/templates.interface';

@Controller('api')
@UseGuards(AuthGuard)
export class PublicController {
  constructor(private readonly template: TemplatesService) {}

  @Get('templates')
  getTemplates(@Query() templatesDto: TemplatesDto): Promise<TemplatesData> {
    return this.template.getTemplates(templatesDto);
  }
}
