import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { PrismaService } from '@repo/shared';
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import prompt from './instructions/ai-prompt.json';
import { DetailsTemplates } from './interfaces/template.interface';
import { categoriesTemplate } from 'src/common/constants/categories.constans';
import { MailService } from 'src/mail/services/mail.service';
import { User } from '../../interfaces/user.interface';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { NotificationsService } from 'src/notifications/services/notifications.service';
import { Template, TemplateCategory } from 'src/interfaces/template.interface';

@Processor('addTemplateQueue', { concurrency: 1 })
export class TemplateConsumer extends WorkerHost {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
    private readonly notification: NotificationsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    super();
  }

  async process(job: Job): Promise<any> {
    const {
      id,
      slugUrl,
      templateData,
      addingUserId,
      addingUserEmail,
      skipJsonStructure,
    } = job.data;

    try {
      let user: User | null = await this.prisma.client.user.findUnique({
        where: { userId: templateData.creator.id },
      });

      console.log('USER', user);

      if (!user) {
        user = await this.prisma.client.user.create({
          data: {
            avatar: templateData.creator.avatar,
            slugUrl: templateData.creator.username.toLowerCase(),
            userId: templateData.creator.id,
            username: templateData.creator.username,
          },
        });
      }

      // const promptGenerate = await generateText({
      //   model: google('gemini-2.5-flash'),

      //   prompt: `${prompt.prompt}, oto nazwa tego szablonu ${templateData.name}, oto kanały i kategorie ${JSON.stringify(templateData.serialized_source_guild.channels)}, role ${JSON.stringify(templateData.serialized_source_guild.roles)}, pominac strukture json: ${skipJsonStructure} `,
      // });

      // const category = this.determinateCategory(promptGenerate.text);

      const categoriesCount =
        templateData.serialized_source_guild.channels.reduce((acc, channel) => {
          if (channel.type === 4) return acc + 1;
          return acc;
        }, 0);

      const familyData = await this.checkIsTemplateHaveFamily(
        templateData.description,
        id,
      );

      console.log('FAMILY DATA', familyData);

      await this.prisma.client.templates.create({
        data: {
          id,
          categories: TemplateCategory.ALL,
          link: `https://discord.new/${templateData.code}`,
          slugUrl,
          title: templateData.name,
          description: 'Wszystkie',
          code: '{}',
          familyId: familyData.familyId,
          isLatest: true,
          version: familyData.version,
          sourceServerId: templateData.description,
          authorId: templateData.creator.id,
          addingUserId,
          usageCount: templateData.usage_count,
          channelsCount:
            templateData.serialized_source_guild.channels.length -
            categoriesCount,
          rolesCount: templateData.serialized_source_guild.roles.length,
          categoriesCount,
        },
      });

      await this.mailService.sendTemplateAddedEmail(
        addingUserEmail,
        id,
        slugUrl,
      );

      this.notification.sendNotification({
        type: 'SUCCESS',
        title: 'Szablon dodany',
        description: `Szablon ${slugUrl} został pomyślnie dodany`,
        userId: addingUserId,
      });

      await this.cacheManager.del(`reserve:${templateData.code}`);

      return {};
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  // private determinateCategory(text: string) {
  //   try {
  //     const [firstCategory, description, json] = text
  //       .split('<>')
  //       .map((el) => el.trim());

  //     const firstCategoryVaild = categoriesTemplate.includes(firstCategory);

  //     const categories = [firstCategory];

  //     const details: DetailsTemplates = {
  //       category: categories.join(','),
  //       description: description ? description : 'Brak opisu szablonu',
  //       code: JSON.stringify(json),
  //     };

  //     if (!firstCategoryVaild) {
  //       details.category = 'Wszystkie';
  //       return details;
  //     }
  //     if (firstCategoryVaild) return details;
  //   } catch (err) {
  //     console.log(err);
  //     throw err;
  //   }
  // }

  private async checkIsTemplateHaveFamily(
    sourceServerId: string,
    id: string,
  ): Promise<{ familyId: string; version: number }> {
    try {
      const family: Template | null =
        await this.prisma.client.templates.findFirst({
          where: { sourceServerId },
          orderBy: { version: 'desc' },
        });

      console.log('FAMILY', family);

      if (!family) return { familyId: id, version: 1 };

      await this.prisma.client.templates.update({
        where: { id: family.id },
        data: { isLatest: false },
      });

      return { familyId: family.familyId, version: family.version + 1 };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
