import { Controller, HttpCode, Get, Query, Post, Body } from '@nestjs/common';
import { SettingsService } from './services/settings.service';
import { SettingsDto } from './dto/settings.dto';
import { SettingsTemplateService } from './services/settings-template.service';
import { SettingsTemplateDto } from './dto/settings-template.dto';

@Controller('/api/internal/settings')
export class SettingsController {
  constructor(
    private readonly settingsService: SettingsService,
    private readonly settingsTemplateService: SettingsTemplateService,
  ) {}

  @Get()
  @HttpCode(200)
  getSettings(@Query() data: SettingsDto) {
    return this.settingsService.getSettings(data);
  }

  @Post('/account')
  @HttpCode(200)
  updateSettingsTemplate(@Body() data: SettingsTemplateDto) {
    return this.settingsTemplateService.updateSettingsTemplate(data);
  }
}
