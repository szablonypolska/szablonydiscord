import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'addTemplateQueue',
    }),
  ],
  exports: [BullModule],
})
export class QueueModule {}
