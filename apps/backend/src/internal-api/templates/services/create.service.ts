import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import ShortUniqueId from 'short-unique-id';
import { PrismaService } from '@repo/shared';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { prompt } from '../instructions/ai-prompt.json';
import { categoriesTemplate } from 'src/common/constants/categories.constans';
import { DetailsTemplates } from '../interfaces/templates.interface';
import { differenceInDays, format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { slugify } from 'src/common/utils/slugify';

@Injectable()
export class TemplatesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  private uid = new ShortUniqueId({ length: 15 });
  private channelName: string[] = [];
  private rolesName: string[] = [];
  private slugUrl: string = null;
  private todayDate = format(new Date(), 'dd.MM.yyyy', { locale: pl });

  private determinateCategory(text: string) {
    const [firstCategory, description] = text.split(',').map((el) => el.trim());

    const firstCategoryVaild = categoriesTemplate.includes(firstCategory);

    const categories = [firstCategory];

    const details: DetailsTemplates = {
      category: categories.join(','),
      description: description ? description : 'Brak opisu szablonu',
    };

    if (!firstCategoryVaild) {
      details.category = 'Wszystkie';
      return details;
    }
    if (firstCategoryVaild) return details;
  }

  async addTemplate(id: string): Promise<{ message: string }> {
    const link = `https://discord.com/api/v9/guilds/templates/${id}`;
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    try {
      const fetchTemplates = await lastValueFrom(this.httpService.get(link));
      const templates = await this.prisma.client.templates.findMany();
      const differenceDays = differenceInDays(
        new Date(),
        new Date(fetchTemplates.data.created_at),
      );
      const { roles, channels } = fetchTemplates.data.serialized_source_guild;

      const templateRepeat = templates.find(
        (repeat: any) => repeat.link === `https://discord.new/${id}`,
      );
      const templateRepeatName = templates.find(
        (repeat: any) => repeat.title === fetchTemplates.data.name,
      );

      const checkReserveTemplate = await this.checkReserveTemplate(
        fetchTemplates.data.name,
        fetchTemplates.data.description,
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

      if (roles.length < 15 && channels.length < 10) {
        throw new BadRequestException('does not meet the requirements');
      }

      this.channelName = channels.map((el) => el.name);
      this.rolesName = roles.map((el) => el.name);

      const promptGenerate = `${prompt}, oto nazwa tego szablonu ${fetchTemplates.data.name} oto kanały tego szablonu: ${this.channelName.join(',')}, oto role tego serwera ${this.rolesName}`;

      const result = await model.generateContent(promptGenerate);
      const text = result.response.text();
      const category = this.determinateCategory(text);

      const checkUserIsExists = await this.prisma.client.user.findUnique({
        where: {
          userId: fetchTemplates.data.creator.id,
        },
      });

      if (!checkUserIsExists) {
        await this.prisma.client.user.create({
          data: {
            avatar: fetchTemplates.data.creator.avatar,
            slugUrl: fetchTemplates.data.creator.username.toLowerCase(),
            userId: fetchTemplates.data.creator.id,
            username: fetchTemplates.data.creator.username,
          },
        });
      }

      this.slugUrl = await slugify(fetchTemplates.data.name);

      await this.prisma.client.templates.create({
        data: {
          templateId: this.uid.rnd(),
          categories: category.category,
          dateCreate: this.todayDate,
          link: `https://discord.new/${id}`,
          slugUrl: this.slugUrl,
          title: fetchTemplates.data.name,
          description: category.description,
          sourceServerId: fetchTemplates.data.description,
          usageCount: fetchTemplates.data.usage_count,
          authorId: fetchTemplates.data.creator.id,
        },
      });

      return { message: 'Templates is created' };
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
