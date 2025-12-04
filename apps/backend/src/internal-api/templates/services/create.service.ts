import { Injectable } from '@nestjs/common';

import { AddTemplateDto } from '../dto/add.dto';
import { TemplatesCoreService } from 'src/shared/services/template-add.service';

@Injectable()
export class TemplatesAddService {
  constructor(private handleTemplate: TemplatesCoreService) {}

  async addTemplate(
    addTemplateDto: AddTemplateDto,
  ): Promise<{ message: string; id: string }> {
    return this.handleTemplate.addTemplate(
      addTemplateDto.id,
      addTemplateDto.addingUserId,
      addTemplateDto.skipJsonStructure || false,
    );
  }
}
