import { Controller, Get } from '@nestjs/common';
import { QueueService } from './queue.service';

@Controller('api/queue')
export class QueueController {
  constructor(private readonly queue: QueueService) {}

  @Get('length')
  getLengthWaitElement(): Promise<boolean> {
    return this.queue.getLengthWaitElement();
  }

  @Get('test')
  create(): Promise<void> {
    return this.queue.test();
  }
}
