import { Module } from '@nestjs/common';
import { TemplateController } from './template.controller';
import { TemplateService } from './template.service';
import { SharedModule } from '@repo/shared';
import { BullModule } from '@nestjs/bullmq';
import { TemplateConsumer } from './template.queue.consumer';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    SharedModule,
    HttpModule,
    BullModule.registerQueue({
      name: 'scanQueue',
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true,
        attempts: 5,
        backoff: {
          type: 'fixed',
          delay: 5000,
        },
      },
    }),
  ],
  controllers: [TemplateController],
  providers: [TemplateService, TemplateConsumer],
})
export class TemplateModule {}
