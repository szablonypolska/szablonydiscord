import { HttpService } from '@nestjs/axios';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { lastValueFrom } from 'rxjs';
import * as admin from 'firebase-admin';
import { Inject } from '@nestjs/common';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';
import { PrismaService } from '@repo/shared';

@Processor('scanQueue', {
  limiter: {
    max: 50,
    duration: 1000,
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

      await baseRef.update({ usageCount: response.data.usage_count });

      this.batchTemplate.push({
        templateId: job.data.ID.toString(),
        title: job.data.title,
        usage: response.data.usage_count,
        dateCreate: job.data.dateCreate,
      });

      if (this.batchTemplate.length > 5) {
        const test = await this.prisma.template.createMany({
          data: this.batchTemplate,
        });

        console.log(`zapisano`, test);

        this.batchTemplate = [];
      }

      console.log('skanuje', job.id);

      this.websocket.server.emit('message', {
        title: response.data.name,
        id: job.data.ID,
        usage: response.data.usage_count,
        dateCreate: '23.12.2024',
      });
    } catch (err) {
      if (err.response?.status === 429) {
        throw new Error('Rate limit error');
      }

      if (err.response?.data.code === 10057) baseRef.remove();

      console.log(`X`, job.data.ID, job.data.dateCreate);
      console.log(err);
    }
  }
}
