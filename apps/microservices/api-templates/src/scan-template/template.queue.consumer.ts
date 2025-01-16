import { HttpService } from '@nestjs/axios';
import { InjectQueue, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job, Queue } from 'bullmq';
import { lastValueFrom } from 'rxjs';
import * as admin from 'firebase-admin';
import { Inject } from '@nestjs/common';
import { PrismaService } from '@repo/shared';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';

@Processor('scanQueue', {
  limiter: {
    max: 10,
    duration: 1100,
  },
})
export class TemplateConsumer extends WorkerHost {
  private canProcessQueue = false;
  private batchTemplate = [];

  set toggleQueue(value: boolean) {
    this.canProcessQueue = value;
  }

  constructor(
    private readonly httpService: HttpService,
    @Inject('FIREBASE_APP') private readonly admin: admin.app.App,
    @InjectQueue('scanQueue') private readonly queue: Queue,
    private readonly websocket: WebsocketGateway,
    private readonly prisma: PrismaService,
  ) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<void> {
    if (!this.canProcessQueue) return;
    let baseRef = this.admin.database().ref(`Template/box/${job.data.ID}`);

    try {
      const codeTemplate = job.data.link.split('https://discord.new/')[1];
      const response = await lastValueFrom(
        this.httpService.get(
          `https://discord.com/api/v9/guilds/templates/${codeTemplate}`,
        ),
      );

      await baseRef.update({
        usageCount: response.data.usage_count,
        userId: response.data.creator.id,
        avatar: response.data.creator.avatar,
        username: response.data.creator.username,
      });
      const waitElement = await this.queue.getWaitingCount();

      this.batchTemplate.push({
        templateId: job.data.ID.toString(),
        title: job.data.title,
        usage: response.data.usage_count,
        dateCreate: job.data.dateCreate,
      });

      console.log(
        response.data.creator.id,
        response.data.creator.avatar,
        response.data.creator.username,
      );

      if (this.batchTemplate.length > 5) {
        await this.prisma.client.template.createMany({
          data: this.batchTemplate,
        });

        this.batchTemplate = [];
      }

      console.log('scan', job.id, waitElement);

      this.websocket.server.emit('message', {
        title: response.data.name,
        id: job.data.ID,
        usage: response.data.usage_count,
        dateCreate: job.data.dateCreate,
        waitElement: waitElement,
      });
    } catch (err) {
      if (err.response?.status === 429) {
        throw new Error('Rate limit error');
      }

      if (err.response?.data.code === 10057) baseRef.remove();

      console.log(`ERROR`, job.data.ID, job.data.dateCreate);
      console.log(err);
    }
  }
}
