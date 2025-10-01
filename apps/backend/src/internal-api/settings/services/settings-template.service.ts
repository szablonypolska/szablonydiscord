import { SettingsTemplateDto } from '../dto/settings-template.dto';
import { PrismaService } from '@repo/shared';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { User } from '../../../interfaces/user.interface';

@Injectable()
export class SettingsTemplateService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private prisma: PrismaService,
  ) {}

  async updateSettingsTemplate(data: SettingsTemplateDto) {
    try {
      const user: User | null = await this.prisma.client.user.findUnique({
        where: { userId: data.userId },
        include: { settings: true },
      });

      if (!user)
        throw new BadRequestException({ ok: false, message: 'User not found' });

      if (
        user.settings.monitoring === data.monitoring &&
        user.settings.templatesDetail === data.templatesDetail
      ) {
        throw new BadRequestException({
          ok: false,
          message: 'No changes detected',
        });
      }

      const update = await this.prisma.client.settings.update({
        where: { id: user.settings.id },
        data: {
          monitoring: data.monitoring,
          templatesDetail: data.templatesDetail,
        },
      });

      await this.cacheManager.del(`settings:${data.userId}`);
      await this.cacheManager.set(
        `settings:${data.userId}`,
        JSON.stringify(update),
        2592000000,
      );

      return { ok: true, settings: update };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
