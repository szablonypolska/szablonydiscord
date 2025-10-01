import { BadRequestException, Injectable } from '@nestjs/common';
import { SettingsDto } from '../dto/settings.dto';
import { PrismaService } from '@repo/shared';
import { Inject } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { User, Settings } from '../../../interfaces/user.interface';

@Injectable()
export class SettingsService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private prisma: PrismaService,
  ) {}

  async getSettings(data: SettingsDto) {
    try {
      let settings: Settings | null = null;
      const checkIfSettingsInCache = await this.cacheManager.get(
        `settings:${data.userId}`,
      );

      if (!checkIfSettingsInCache) {
        const checkUser: User | null = await this.prisma.client.user.findUnique(
          {
            where: { userId: data.userId },
            select: { settings: true },
          },
        );

        if (!checkUser) throw new BadRequestException('User not found');

        await this.cacheManager.set(
          `settings:${data.userId}`,
          JSON.stringify(checkUser.settings),
          2592000000,
        );
        settings = JSON.parse(JSON.stringify(checkUser.settings));
      } else {
        settings = JSON.parse(checkIfSettingsInCache as string);
      }

      return { ok: true, settings };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
