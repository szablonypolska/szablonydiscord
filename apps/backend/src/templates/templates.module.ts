import { Module } from '@nestjs/common';
import { TemplatesService } from './services/templates.service';
import { TemplateController } from './templates.controller';
import { SharedModule, FirebaseModule } from '@repo/shared';
import { HttpModule } from '@nestjs/axios';
import { MigrationService } from './services/migration.service';

@Module({
  imports: [SharedModule, FirebaseModule, HttpModule],
  providers: [TemplatesService, MigrationService],
  controllers: [TemplateController],
})
export class TemplateModule {}
