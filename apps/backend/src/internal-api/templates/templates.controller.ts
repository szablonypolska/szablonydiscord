import { Body, Controller, Post, Get, HttpCode, Query } from '@nestjs/common';
import { TemplatesService } from './services/create.service';
import { MigrationService } from './services/migration.service';
import { SearchService } from './services/search.service';
import { Template } from '../../interfaces/template.interface';
import { VerifyTemplateService } from './services/verify.service';
import { VerifyTemplateDto } from './dto/verify.dto';
import { SearchDto } from './dto/search.dto';
import { SuggestService } from './services/suggest.service';

@Controller('/api/internal/templates')
export class TemplateController {
  constructor(
    private readonly templates: TemplatesService,
    private readonly migrations: MigrationService,
    private readonly search: SearchService,
    private readonly verify: VerifyTemplateService,
    private readonly suggest: SuggestService,
  ) {}

  @Post('/create')
  @HttpCode(201)
  async addTemplate(@Body('id') id: string): Promise<{ message: string }> {
    return this.templates.addTemplate(id);
  }

  @Get('/migration')
  @HttpCode(200)
  async migration() {
    await this.migrations.migration();
  }

  @Get('/verify')
  @HttpCode(200)
  async verifyTemplate(@Query() data: VerifyTemplateDto) {
    await this.verify.verifyTemplates(data);
  }

  @Post('/search')
  @HttpCode(200)
  searchTemplate(
    @Body() searchDto: SearchDto,
  ): Promise<{ templates: Template[]; type: string }> {
    return this.search.searchTemplate(searchDto);
  }

  @Post('/suggest')
  @HttpCode(200)
  suggestTemplate(@Body() searchDto: SearchDto): Promise<{
    suggestions: {
      title: string;
      usageCount: number;
      category: string;
      slugUrl: string;
    }[];
  }> {
    return this.suggest.suggestTemplate(searchDto);
  }
}
