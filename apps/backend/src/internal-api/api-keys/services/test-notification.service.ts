import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TestNotificationData } from '../interfaces/test-notification.interface';
import { PrismaService } from '@repo/shared';
import { Api } from '../../../interfaces/api.interface';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class NotificationTestService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  private replaceVariables = (description: string, api: Api) => {
    const variables = {
      name: api.name,
      reqCount: api.reqCount,
      successCount: api.successCount,
      errorCount: api.errorCount,
      dailyCount: api.dailyCount,
      monthlyCount: api.monthlyCount,
      dailyLimit: api.dailyLimit,
      monthlyLimit: api.monthlyLimit,
      usageDailyPercent: (api.dailyCount / api.dailyLimit) * 100,
    };

    return description.replace(/\$\{([^}]+)\}/g, (match, key) => {
      return variables[key] !== undefined ? variables[key] : null;
    });
  };

  async testNotification(testBody: TestNotificationData): Promise<string> {
    try {
      const searchApi = await this.prisma.client.api.findUnique({
        where: { apiKeyId: testBody.apiKeyId },
      });

      console.log(searchApi);

      if (!searchApi) throw new BadRequestException('Api does not exist');
      if (searchApi.userId !== testBody.userId)
        throw new UnauthorizedException("you don't have access to this key");

      const description = this.replaceVariables(
        testBody.description,
        searchApi,
      );

      const embed = {
        embeds: [
          {
            title: testBody.title,
            description: description,

            footer: {
              text: 'powered by SzablonyDiscord',
            },
          },
        ],
      };

      await firstValueFrom(this.httpService.post(testBody.webhookUrl, embed));
      return 'elo';
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
