import { Injectable, Inject } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { createClient } from 'redis';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { PrismaService } from '@repo/shared';
import { Api } from '../../interfaces/api.interface';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';

@Injectable()
export class FlushRedisToPrisma {
  private redisClient;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly prisma: PrismaService,
    private readonly websocket: WebsocketGateway,
  ) {
    this.redisClient = createClient();
    this.redisClient.connect();
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCron(): Promise<void> {
    const keys = await this.redisClient.keys('*api_key*');

    for (const key of keys) {
      const value: Api = await this.cacheManager.get(
        key.split('undefined:')[1],
      );

      if (value && key) {
        this.websocket.server.emit('apikey', {
          apiKeyId: value.apiKeyId,
          reqCount: value.reqCount,
          successCount: value.successCount,
          errorCount: value.errorCount,
          lastUsed: value.lastUsed,
          dailyCount: value.dailyCount,
          monthlyCount: value.monthlyCount,
          userId: value.userId,
        });

        await this.prisma.client.api.update({
          where: { secretKey: value.secretKey },
          data: {
            reqCount: value.reqCount,
            successCount: value.successCount,
            errorCount: value.errorCount,
            lastUsed: value.lastUsed,
            dailyCount: value.dailyCount,
            monthlyCount: value.monthlyCount,
          },
        });
      }
    }
  }
}
