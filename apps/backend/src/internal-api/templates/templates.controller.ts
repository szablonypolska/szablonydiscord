import { Body, Controller, Post, Get, HttpCode } from '@nestjs/common';
import { TemplatesService } from './services/templates.service';
import { MigrationService } from './services/migration.service';
import { SearchService } from './services/search.service';
import { Template } from '../../interfaces/template.interface';

@Controller('/api/internal')
export class TemplateController {
  constructor(
    private readonly templates: TemplatesService,
    private readonly migrations: MigrationService,
    private readonly search: SearchService,
  ) {}

  @Post('/create')
  @HttpCode(201)
  async addTemplate(@Body('id') id: string): Promise<{ message: string }> {
    return this.templates.addTemplate(id);
  }

  @Get('/migration')
  async migration() {
    await this.migrations.migration();
  }

  @Post('/search')
  searchTemplate(
    @Body('name') name: string,
  ): Promise<{ templates: Template[] }> {
    return this.search.searchTemplate(name);
  }
}
