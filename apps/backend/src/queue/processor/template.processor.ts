import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { PrismaService } from '@repo/shared';
import { slugify } from 'src/common/utils/slugify';
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import prompt from './instructions/ai-prompt.json';
import { DetailsTemplates } from './interfaces/template.interface';
import { categoriesTemplate } from 'src/common/constants/categories.constans';
import { MailService } from 'src/mail/services/mail.service';
import { User } from '../../interfaces/user.interface';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';

@Processor('addTemplateQueue', { concurrency: 1 })
export class TemplateConsumer extends WorkerHost {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    super();
  }

  async process(job: Job): Promise<any> {
    const { templateId, slugUrl, templateData, addingUserId, addingUserEmail } =
      job.data;

    try {
      let user: User | null = await this.prisma.client.user.findUnique({
        where: { userId: templateData.creator.id },
      });

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

      const promptGenerate = await generateText({
        model: google('gemini-2.5-flash'),

        prompt: `${prompt.prompt}, oto nazwa tego szablonu ${templateData.name}, oto kanały i kategorie ${JSON.stringify(templateData.serialized_source_guild.channels)}, role ${JSON.stringify(templateData.serialized_source_guild.roles)}, `,
      });

      const category = this.determinateCategory(promptGenerate.text);

      const categoriesCount =
        templateData.serialized_source_guild.channels.reduce((acc, channel) => {
          if (channel.type === 4) return acc + 1;
          return acc;
        }, 0);

      await this.prisma.client.templates.create({
        data: {
          templateId,
          categories: category.category,
          link: `https://discord.new/${templateData.code}`,
          slugUrl,
          title: templateData.name,
          description: category.description,
          code: category.code,
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
        templateId,
        slugUrl,
      );

      await this.cacheManager.del(`reserve:${templateData.code}`);

      return {};
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  private determinateCategory(text: string) {
    try {
      const [firstCategory, description, json] = text
        .split('<>')
        .map((el) => el.trim());

      const firstCategoryVaild = categoriesTemplate.includes(firstCategory);

      const categories = [firstCategory];

      const details: DetailsTemplates = {
        category: categories.join(','),
        description: description ? description : 'Brak opisu szablonu',
        code: JSON.stringify(json),
      };

      if (!firstCategoryVaild) {
        details.category = 'Wszystkie';
        return details;
      }
      if (firstCategoryVaild) return details;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
