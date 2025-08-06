import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import ShortUniqueId from 'short-unique-id';
import { PrismaService } from '@repo/shared';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { differenceInDays } from 'date-fns';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class TemplatesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
    @InjectQueue('addTemplateQueue') private templatesQueue: Queue,
  ) {}

  private uid = new ShortUniqueId({ length: 15 });

  async addTemplate(id: string): Promise<{ message: string; id: string }> {
    const link = `https://discord.com/api/v9/guilds/templates/${id}`;

    try {
      const fetchTemplates = await lastValueFrom(this.httpService.get(link));
      const templates = await this.prisma.client.templates.findMany();
      const differenceDays = differenceInDays(
        new Date(),
        new Date(fetchTemplates.data.created_at),
      );
      const { roles, channels } = fetchTemplates.data.serialized_source_guild;
      const templateId = this.uid.rnd();

      const templateRepeat = templates.find(
        (repeat: any) => repeat.link === `https://discord.new/${id}`,
      );
      const templateRepeatName = templates.find(
        (repeat: any) => repeat.title === fetchTemplates.data.name,
      );

      const checkReserveTemplate = await this.checkReserveTemplate(
        fetchTemplates.data.name,
        fetchTemplates.data.source_guild_id,
      );

      if (checkReserveTemplate)
        throw new ConflictException('This template is reserve.');

      if (templateRepeat) {
        throw new ConflictException('Template already exists');
      }

      if (differenceDays <= 30) {
        if (templateRepeatName) {
          throw new ConflictException('Template already exists');
        }
      }

      if (roles.length < 2 && channels.length < 2) {
        throw new BadRequestException('does not meet the requirements');
      }

      await this.templatesQueue.add(
        'addTemplate',
        {
          templateId: templateId,
          templateData: fetchTemplates.data,
          channels: fetchTemplates.data.serialized_source_guild.channels,
          roles: fetchTemplates.data.serialized_source_guild.roles,
        },
        {
          attempts: 2,
          backoff: {
            type: 'exponential',
            delay: 5000,
          },
          jobId: `${this.uid.rnd()}`,
        },
      );

      return { message: 'Templates is added to queue', id: templateId };
    } catch (err) {
      throw err;
    }
  }

  

  private async checkReserveTemplate(name: string, serverId: string) {
    const reserveTemplates =
      await this.prisma.client.reserveTemplate.findMany();

    const checkByName = reserveTemplates.some(
      (el: { name: string }) => el.name === name,
    );

    const checkById = reserveTemplates.some(
      (el: { serverId: string }) => el.serverId === serverId,
    );

    if (checkByName || checkById) return true;

    return false;
  }
}
