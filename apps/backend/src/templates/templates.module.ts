import { Module } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { TemplateController } from './templates.controller';
import { SharedModule } from '@repo/shared';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [SharedModule, HttpModule, ConfigModule.forRoot()],
  providers: [TemplatesService],
  controllers: [TemplateController],
})
export class TemplateModule {}
