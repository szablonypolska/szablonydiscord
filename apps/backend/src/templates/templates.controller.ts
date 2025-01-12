import { Body, Controller, Post, Res } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { Response } from 'express';

@Controller('/api')
export class TemplateController {
  constructor(private readonly templates: TemplatesService) {}

  @Post('/create')
  async addTemplate(@Body('id') id: string, @Res() res: Response) {
    await this.templates.addTemplate(id, res);
  }
}
