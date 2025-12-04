import { Controller, HttpCode, Get, Query, Post, Body } from '@nestjs/common';
import { SettingsService } from './services/settings.service';
import { SettingsDto } from './dto/settings.dto';
import { SettingsTemplateService } from './services/settings-template.service';
import { SettingsTemplateDto } from './dto/settings-template.dto';
import { SetTokenService } from './services/set-token.service';
import { TokenDto } from './dto/token.dto';
import { TokenService } from './services/token.service';
import { SetTokenDto } from './dto/set-token.dto';

@Controller('/api/internal/settings')
export class SettingsController {
  constructor(
    private readonly settingsService: SettingsService,
    private readonly settingsTemplateService: SettingsTemplateService,
    private readonly setTokenService: SetTokenService,
    private readonly tokenService: TokenService,
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

  @Post('/token')
  @HttpCode(200)
  setToken(@Body() data: SetTokenDto) {
    return this.setTokenService.setToken(data);
  }

  @Get('/token')
  @HttpCode(200)
  getToken(@Query() data: TokenDto) {
    return this.tokenService.getToken(data);
  }
}
