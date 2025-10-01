import { Module } from '@nestjs/common';
import { TemplatesAddService } from './services/create.service';
import { TemplateController } from './templates.controller';
import { SharedModule, FirebaseModule } from '@repo/shared';
import { HttpModule } from '@nestjs/axios';
import { MigrationService } from './services/migration.service';
import { SearchService } from './services/search.service';
import { VerifyTemplateService } from './services/verify.service';
import { TemplateIndexModule } from './index/template-index.module';
import { SuggestService } from './services/suggest.service';
import { QueueModule } from '../../queue/queue.module';
import { LocalSharedModule } from 'src/shared/shared.module';
import { TemplatesSimiliarService } from './services/similiar.service';

@Module({
  imports: [
    SharedModule,
    FirebaseModule,
    HttpModule,
    TemplateIndexModule,
    QueueModule,
    LocalSharedModule,
  ],
  providers: [
    TemplatesAddService,
    MigrationService,
    TemplatesSimiliarService,
    SearchService,
    VerifyTemplateService,
    SuggestService,
  ],
  controllers: [TemplateController],
})
export class TemplateModule {}
