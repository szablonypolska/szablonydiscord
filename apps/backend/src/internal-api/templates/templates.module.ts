import { Module } from '@nestjs/common';
import { TemplatesService } from './services/templates.service';
import { TemplateController } from './templates.controller';
import { SharedModule, FirebaseModule } from '@repo/shared';
import { HttpModule } from '@nestjs/axios';
import { MigrationService } from './services/migration.service';
import { SearchService } from './services/search.service';

@Module({
  imports: [SharedModule, FirebaseModule, HttpModule],
  providers: [TemplatesService, MigrationService, SearchService],
  controllers: [TemplateController],
})
export class TemplateModule {}
