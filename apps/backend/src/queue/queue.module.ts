import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { QueueController } from './queue.controller';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'scanQueue',
    }),
  ],
  controllers: [QueueController],
  providers: [QueueService],
})
export class QueueModule {}
