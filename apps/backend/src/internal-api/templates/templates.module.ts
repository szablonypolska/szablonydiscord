import { Module } from '@nestjs/common';
import { TemplatesService } from './services/create.service';
import { TemplateController } from './templates.controller';
import { SharedModule, FirebaseModule } from '@repo/shared';
import { HttpModule } from '@nestjs/axios';
import { MigrationService } from './services/migration.service';
import { SearchService } from './services/search.service';
import { VerifyTemplateService } from './services/verify.service';
import { TemplateIndexModule } from './index/template-index.module';
import { SuggestService } from './services/suggest.service';
import { QueueModule } from '../queue/queue.module';

@Module({
  imports: [
    SharedModule,
    FirebaseModule,
    HttpModule,
    TemplateIndexModule,
    QueueModule,
  ],
  providers: [
    TemplatesService,
    MigrationService,
    SearchService,
    VerifyTemplateService,
    SuggestService,
  ],
  controllers: [TemplateController],
})
export class TemplateModule {}
