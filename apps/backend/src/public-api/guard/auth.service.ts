import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '@repo/shared';
import { Api } from '../../interfaces/api.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly prisma: PrismaService,
  ) {}

  private createRedisApi = async (apiKey: string) => {
    const apiKeyRedis = `api_key:${apiKey}`;
    let value: Api = await this.cacheManager.get(apiKeyRedis);

    console.log(value);

    if (!value) {
      value = await this.prisma.client.api.findUnique({
        where: { secretKey: apiKey },
      });

      if (!value) {
        throw new UnauthorizedException('Api key not found');
      }

      await this.cacheManager.set(apiKeyRedis, value);
    }
    return value;
  };

  private counterIncrement = async (value: Api) => {
    const apiKeyRedis = `api_key:${value.secretKey}`;

    value.reqCount += 1;
    value.successCount += 1;
    value.monthlyCount += 1;
    value.dailyCount += 1;
    value.lastUsed = new Date();

    await this.cacheManager.set(apiKeyRedis, value);
  };

  private checkAvailability = async (value: Api) => {
    if (!value.status)
      throw new ForbiddenException('Api key is off, turn on in settings');

    if (value.monthlyCount > value.monthlyLimit) {
      value.errorCount += 1;
      await this.updateErrorCounter(value.secretKey);
      throw new ForbiddenException(
        "you have reached your monthly query limit'",
      );
    }
    return true;
  };

  private updateErrorCounter = async (apiKey: string) => {
    const apiKeyRedis = `api_key:${apiKey}`;
    const value: Api = await this.cacheManager.get(apiKeyRedis);

    if (!value) return false;

    value.reqCount += 1;
    value.errorCount += 1;
    await this.cacheManager.set(apiKeyRedis, value);
  };

  async validateRequest(apiKey: string): Promise<boolean> {
    try {
      if (!apiKey) {
        throw new UnauthorizedException('you need to provide api key');
      }

      const value = await this.createRedisApi(apiKey);

      await this.checkAvailability(value);

      await this.counterIncrement(value);

      return true;
    } catch (err) {
      await this.updateErrorCounter(apiKey);
      throw err;
    }
  }
}
