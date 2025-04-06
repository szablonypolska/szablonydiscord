import { Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { DataItem } from '../interfaces/migration.interface';
import { lastValueFrom } from 'rxjs';
import { PrismaService } from '@repo/shared';
import ShortUniqueId from 'short-unique-id';
import { HttpService } from '@nestjs/axios';
import { isPolishOnly } from 'src/common/utils/validationPolishChar.util';

@Injectable()
export class MigrationService {
  constructor(
    @Inject('FIREBASE_APP') private readonly firebaseApp: admin.app.App,
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  private slugUrl: string = null;
  private uid = new ShortUniqueId({ length: 15 });
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

          if (isPolishOnly(fetchTemplates.data.name)) {
            this.slugUrl = this.uid.rnd();
          } else {
            this.slugUrl = fetchTemplates.data.name
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/[^\w\s-]/g, '')
              .replace(/\s+/g, '-')
              .replace(/-{2,}/g, '-')
              .replace(/^-+|-+$/g, '')
              .toLowerCase();
          }

          const checkUniqueSlug = await this.prisma.client.templates.findUnique(
            { where: { slugUrl: this.slugUrl } },
          );

          if (checkUniqueSlug) {
            this.slugUrl = this.uid.rnd();
          }

          await this.prisma.client.templates.create({
            data: {
              templateId: this.uid.rnd(),
              slugUrl: this.slugUrl,
              categories: el.categories,
              dateCreate: el.dateCreate,
              link: el.link,
              title: fetchTemplates.data.name,
              description: el.description,
              sourceServerId: el.serverOutputId ? el.serverOutputId : null,
              usageCount: el.usageCount || 0,
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
