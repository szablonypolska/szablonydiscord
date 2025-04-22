import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { DataItem } from './interfaces/template.interface';
import { TemplateConsumer } from './template.queue.consumer';
import { PrismaService } from '@repo/shared';

@Injectable()
export class TemplateService {
  constructor(
    @InjectQueue('scanQueue') private queue: Queue,
    private readonly prisma: PrismaService,
    private readonly template: TemplateConsumer,
  ) {}

  async createQueue(): Promise<string> {
    const templates: DataItem[] = await this.prisma.client.templates.findMany();

    const lengthQueue = await this.queue.getWaitingCount();

    if (lengthQueue == 0) {
      for (const element of templates) {
        await this.queue.add('template-scan', element, { delay: 1500 });
      }
    }

    this.template.toggleQueue = true;

    return 'all items added to queuess';
  }
}
