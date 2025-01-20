import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { TemplatesService } from './services/templates.service';
import { AuthGuard } from './guard/auth.guard';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('api')
@UseGuards(AuthGuard)
@UseInterceptors(CacheInterceptor)
export class PublicController {
  constructor(private readonly template: TemplatesService) {}

  @Get('templates')
  getHello(): string {
    return this.template.getHello();
  }
}
