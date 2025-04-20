import { Module } from '@nestjs/common';
import { TemplatesService } from './services/create.service';
import { TemplateController } from './templates.controller';
import { SharedModule, FirebaseModule } from '@repo/shared';
import { HttpModule } from '@nestjs/axios';
import { MigrationService } from './services/migration.service';
import { SearchService } from './services/search.service';
import { VerifyTemplateService } from './services/verify.service';

@Module({
  imports: [SharedModule, FirebaseModule, HttpModule],
  providers: [
    TemplatesService,
    MigrationService,
    SearchService,
    VerifyTemplateService,
  ],
  controllers: [TemplateController],
})
export class TemplateModule {}
