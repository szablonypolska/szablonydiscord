import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@repo/shared';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly prisma: PrismaService,
  ) {}

  async validateRequest(apiKey: string): Promise<boolean> {
    try {
      if (!apiKey) return;

      const apiKeyRedis = `api_key:${apiKey}`;

      const value = await this.cacheManager.get(apiKeyRedis);

      console.log(`zwracaaa`, value);

      if (!value) {
        const valueDatabase = await this.prisma.client.api.findUnique({
          where: { secretKey: apiKey },
        });

        if (!valueDatabase) return false;

        await this.cacheManager.set(apiKeyRedis, valueDatabase, 900);
      }

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
