import { HttpService } from '@nestjs/axios';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { lastValueFrom } from 'rxjs';
import { PrismaService } from '@repo/shared';

@Processor('scanQueue', {
  limiter: {
    max: 10,
    duration: 1100,
  },
})
export class TemplateConsumer extends WorkerHost {
  constructor(
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
  ) {
    super();
  }

  private canProcessQueue = false;

  set toggleQueue(value: boolean) {
    this.canProcessQueue = value;
  }

  async process(job: Job<any, any, string>): Promise<void> {
    if (!this.canProcessQueue) return;

    try {
      const codeTemplate = job.data.link.split('https://discord.new/')[1];
      const response = await lastValueFrom(
        this.httpService.get(
          `https://discord.com/api/v9/guilds/templates/${codeTemplate}`,
        ),
      );

      await this.prisma.client.templates.update({
        where: { templateId: job.data.templateId },
        data: {
          usageCount: response.data.usage_count,
        },
      });
    } catch (err) {
      if (err.response?.status === 429) {
        throw new Error('Rate limit error');
      }

      if (err.response?.data.code === 10057) {
        await this.prisma.client.templates.delete({
          where: { templateId: job.data.templateId },
        });
      }

      console.log(err);
    }
  }
}
