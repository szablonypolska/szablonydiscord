import { Body, Controller, Post, Res, Get } from '@nestjs/common';
import { Response } from 'express';
import { TemplatesService } from './services/templates.service';
import { MigrationService } from './services/migration.service';

@Controller('/api')
export class TemplateController {
  constructor(
    private readonly templates: TemplatesService,
    private readonly migrations: MigrationService,
  ) {}

  @Post('/create')
  async addTemplate(@Body('id') id: string, @Res() res: Response) {
    await this.templates.addTemplate(id, res);
  }

  @Get('/migration')
  async migration() {
    await this.migrations.migration();
  }
}
