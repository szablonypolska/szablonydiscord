import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import ShortUniqueId from 'short-unique-id';
import { PrismaService } from '@repo/shared';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { differenceInDays } from 'date-fns';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { Template } from '../../interfaces/template.interface';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { slugify } from 'src/common/utils/slugify';

@Injectable()
export class TemplatesCoreService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectQueue('addTemplateQueue') private templatesQueue: Queue,
  ) {}

  private uid = new ShortUniqueId({ length: 15 });

  async addTemplate(
    id: string,
    addingUserId: string,
  ): Promise<{
    message: string;
    id: string;
    slugUrl: string;
    position?: number;
    waitingInQueue?: number;
  }> {
    const link = `https://discord.com/api/v9/guilds/templates/${id}`;
    let fetchTemplates;

    try {
      try {
        fetchTemplates = await lastValueFrom(this.httpService.get(link));
      } catch (err) {
        throw new BadRequestException('Template not found');
      }

      const templates = await this.prisma.client.templates.findMany();
      const user = await this.prisma.client.user.findUnique({
        where: { userId: addingUserId },
      });
      const { roles, channels } = fetchTemplates.data.serialized_source_guild;
      const templateId = this.uid.rnd();

      const checkInQueue = await this.cacheManager.get(
        `reserve:${fetchTemplates.data.code}`,
      );

      if (!user) {
        throw new BadRequestException('User not found');
      }

      if (checkInQueue) {
        throw new ConflictException('Template is already in queue');
      }

      await this.checkReserveTemplate(
        fetchTemplates.data.name,
        fetchTemplates.data.source_guild_id,
      );

      await this.checkTemplateExists(
        fetchTemplates.data.created_at,
        templates,
        id,
        fetchTemplates.data.name,
      );

      if (roles.length < 2 && channels.length < 2) {
        throw new BadRequestException('does not meet the requirements');
      }
      const slugUrl = await slugify(fetchTemplates.data.name);

      const job = await this.templatesQueue.add(
        'addTemplate',
        {
          templateId: templateId,
          slugUrl: slugUrl,
          templateData: fetchTemplates.data,
          addingUserId: user.userId,
          addingUserEmail: user.email,
        },
        {
          attempts: 2,
          backoff: {
            type: 'exponential',
            delay: 5000,
          },
          jobId: `${fetchTemplates.data.code}`,
        },
      );

      const waitingInQueue = await this.templatesQueue.getWaiting();
      const position = waitingInQueue.findIndex((item) => item.id === job.id);
      await this.cacheManager.set(
        `reserve:${fetchTemplates.data.code}`,
        true,
        24 * 60 * 60 * 1000,
      );

      return {
        message: 'Templates is added to queue',
        id: templateId,
        slugUrl: slugUrl,
        position: position === -1 ? 0 : position + 1,
        waitingInQueue: waitingInQueue.length,
      };
    } catch (err) {
      throw err;
    }
  }

  private async checkTemplateExists(
    created_at: Date,
    templates: Template[],
    id: string,
    name: string,
  ) {
    try {
      const differenceDays = differenceInDays(new Date(), new Date(created_at));

      const templateRepeat = templates.find(
        (repeat: Template) => repeat.link === `https://discord.new/${id}`,
      );
      const templateRepeatName = templates.find(
        (repeat: Template) => repeat.title === name,
      );

      if (templateRepeat) {
        throw new ConflictException('Template already exists');
      }

      if (differenceDays <= 30) {
        if (templateRepeatName) {
          throw new ConflictException('Template already exists');
        }
      }
    } catch (err) {
      throw err;
    }
  }

  private async checkReserveTemplate(name: string, serverId: string) {
    try {
      const reserveTemplates =
        await this.prisma.client.reserveTemplate.findMany();

      const checkByName = reserveTemplates.some(
        (el: { name: string }) => el.name === name,
      );

      const checkById = reserveTemplates.some(
        (el: { serverId: string }) => el.serverId === serverId,
      );

      if (checkByName || checkById)
        throw new ConflictException('This template is reserve.');
    } catch (err) {
      throw err;
    }
  }
}
