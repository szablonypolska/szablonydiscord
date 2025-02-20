import { Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { DataItem } from '../interfaces/migration.interface';
import { lastValueFrom } from 'rxjs';
import { PrismaService } from '@repo/shared';
import ShortUniqueId from 'short-unique-id';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class MigrationService {
  constructor(
    @Inject('FIREBASE_APP') private readonly firebaseApp: admin.app.App,
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  private number: number = 0;
  private uid = new ShortUniqueId({ length: 15 });
  private userId: string = null;
  private sleep(ms: number): Promise<void> {
    console.log('czekam..');
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async migration(): Promise<string> {
    try {
      const templateSnapshot = await this.firebaseApp
        .database()
        .ref('Template/box/')
        .once('value');

      const array: DataItem[] = Object.values(templateSnapshot.val());

      for (let el of array) {
        const check = await this.prisma.client.templates.findUnique({
          where: { link: el.link },
        });
        const link = `https://discord.com/api/v9/guilds/templates/${el.link.split('https://discord.new/')[1]}`;

        if (!check) {
          await this.sleep(500);
          let fetchTemplates;

          try {
            fetchTemplates = await lastValueFrom(this.httpService.get(link));
          } catch (err) {
            console.log('szablon nie dziala');
            continue;
          }

          if (!fetchTemplates.data) continue;

          let user = await this.prisma.client.user.findUnique({
            where: { userId: fetchTemplates.data.creator.id },
          });

          if (!user) {
            const checkUsername = await this.prisma.client.user.findUnique({
              where: { slugUrl: fetchTemplates.data.creator.username },
            });

            user = await this.prisma.client.user.create({
              data: {
                userId: fetchTemplates.data.creator.id,
                slugUrl: fetchTemplates.data.creator.username.toLowerCase(),
                username: checkUsername
                  ? fetchTemplates.data.creator.id
                  : fetchTemplates.data.creator.username,
                avatar: fetchTemplates.data.creator.avatar,
              },
            });
          }

          const title = el.title
            .normalize('NFKC')
            .replace(/\p{Emoji_Presentation}/gu, '')
            .replace(/[^\p{L}\p{N}\s]/gu, '');

          console.log(`zwraca userId ${el.userId}`);
          console.log(`Zwraca this.userId ${this.userId}`);

          const checkUniqueSlug = await this.prisma.client.templates.findUnique(
            {
              where: {
                slugUrl: title
                  .normalize('NFKC')
                  .split(' ')
                  .join('-')
                  .toLowerCase(),
              },
            },
          );

          const create = await this.prisma.client.templates.create({
            data: {
              templateId: this.uid.rnd(),
              slugUrl: checkUniqueSlug
                ? this.uid.rnd()
                : title.normalize('NFKC').split(' ').join('-').toLowerCase(),
              categories: el.categories,
              dateCreate: el.dateCreate,
              link: el.link,
              title: el.title,
              description: el.description,
              usageCount: el.usageCount || 0,
              clickButtonUse: el.clickButtonUse,
              authorId: user.userId,
            },
          });

          console.log(user);
        }
      }
      return 'przeskanowano';
    } catch (err) {
      console.log(`Ogólny błąd podczas migracji:`, err.message);
    }
  }
}
