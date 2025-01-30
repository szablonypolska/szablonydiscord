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
          await this.sleep(1000);
          let fetchTemplates;

          try {
            fetchTemplates = await lastValueFrom(this.httpService.get(link));
          } catch (err) {
            console.log('szablon nie dziala');
            continue;
          }

          if (!fetchTemplates.data) continue;

          const checkUser = await this.prisma.client.user.findUnique({
            where: { userId: fetchTemplates.data.creator.id },
          });

          if (!checkUser) {
            await this.prisma.client.user.create({
              data: {
                userId: fetchTemplates.data.creator.id,
                username: fetchTemplates.data.creator.username,
                avatar: fetchTemplates.data.creator.avatar,
              },
            });
          }

          const create = await this.prisma.client.templates.create({
            data: {
              templateId: this.uid.rnd(),
              categories: el.categories,
              dateCreate: el.dateCreate,
              link: el.link,
              title: el.title,
              description: el.description,
              usageCount: el.usageCount || 0,
              clickButtonUse: el.clickButtonUse,
              authorId: el.userId ? el.userId : this.userId,
            },
          });

          console.log(create);
        }
      }
      return 'przeskanowano';
    } catch (err) {
      console.log(`Ogólny błąd podczas migracji:`, err.message);
    }
  }
}
