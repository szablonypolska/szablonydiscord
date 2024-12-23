import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class QueueService {
  constructor(@InjectQueue('scanQueue') private readonly queue: Queue) {}

  async getLengthWaitElement(): Promise<boolean> {
    const length = await this.queue.getWaitingCount();

    if (length > 0) return false;

    return true;
  }
}
