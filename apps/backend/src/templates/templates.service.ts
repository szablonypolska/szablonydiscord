import { Injectable } from '@nestjs/common';
import ShortUniqueId from 'short-unique-id';
import { PrismaService } from '@repo/shared';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { prompt } from './instructions/ai-prompt.json';
import { categoriesTemplate } from 'src/common/constants/categories.constans';
import { DetailsTemplates } from './interfaces/templates.interface';

@Injectable()
export class TemplatesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  private uid = new ShortUniqueId({ length: 15 });
  private channelName: string[] = [];
  private rolesName: string[] = [];
  private todayDate = new Intl.DateTimeFormat('pl-PL', {
    month: '2-digit',
    year: 'numeric',
    day: '2-digit',
  }).format(new Date());

  private determinateCategory(text: string) {
    const [firstCategory, secondCategory, description] = text
      .split(',')
      .map((el) => el.trim());

    const firstCategoryVaild = categoriesTemplate.includes(firstCategory);
    const secondCategoryVaild = categoriesTemplate.includes(secondCategory);
    const categories = [firstCategory, secondCategory];

    const details: DetailsTemplates = {
      category: categories.join(','),
      description: description ? description : 'Brak opisu szablonu',
    };

    if (!firstCategoryVaild || !secondCategoryVaild) {
      details.category = 'Wszystkie';
      return details;
    }
    if (firstCategoryVaild && secondCategoryVaild) return details;
  }

  async addTemplate(id: string, res: Response): Promise<void> {
    const link = `https://discord.com/api/v9/guilds/templates/${id}`;
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    try {
      const fetchTemplates = await lastValueFrom(this.httpService.get(link));
      const templates = await this.prisma.client.templates.findMany();
      const { roles, channels } = fetchTemplates.data.serialized_source_guild;

      const templateRepeat = templates.some(
        (repeat: any) => repeat.link === `http://discord.new/${id}`,
      );
      const templateRepeatName = templates.some(
        (repeat: any) => repeat.title === fetchTemplates.data.name,
      );

      if (templateRepeat || templateRepeatName) {
        res.status(409).json({ message: 'Template already exists' });
        return;
      }

      if (roles < 15 && channels < 10) {
        res.status(400).json({ message: 'does not meet the requirements' });
        return;
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
            userId: fetchTemplates.data.creator.id,
            username: fetchTemplates.data.creator.username,
          },
        });
      }

      await this.prisma.client.templates.create({
        data: {
          templateId: this.uid.rnd(),
          categories: category.category,
          dateCreate: this.todayDate,
          link: `https://discord.new/${id}`,
          title: fetchTemplates.data.name,
          description: category.description,
          usageCount: fetchTemplates.data.usage_count,
          authorId: fetchTemplates.data.creator.id,
        },
      });

      res.status(201).json({ message: 'Template created successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching template' });
    }
  }
}
