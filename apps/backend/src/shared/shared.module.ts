import { Module } from '@nestjs/common';
import { TemplatesCoreService } from './services/template-add.service';
import { SharedModule } from '@repo/shared';
import { HttpModule } from '@nestjs/axios';
import { QueueModule } from 'src/internal-api/queue/queue.module';

@Module({
  imports: [SharedModule, HttpModule, QueueModule],
  providers: [TemplatesCoreService],
  exports: [TemplatesCoreService],
})
export class LocalSharedModule {}
