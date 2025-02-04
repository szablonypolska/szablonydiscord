import {
  BadRequestException,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { BodyDataUpdate } from '../interfaces/update.interface';
import { PrismaService } from '@repo/shared';
import { createClient } from 'redis';

@Injectable()
export class UpdateService {
  private redisClient;

  constructor(private readonly prisma: PrismaService) {
    this.redisClient = createClient();
    this.redisClient.connect();
  }

  async updateApi(updateApi: BodyDataUpdate): Promise<string> {
    try {
      let status = null;

      const checkApi = await this.prisma.client.api.findUnique({
        where: { apiKeyId: updateApi.apiKeyId },
      });

      if (!checkApi) throw new BadRequestException('such a key does not exist');

      if (checkApi.userId !== updateApi.userId)
        throw new UnauthorizedException('you are not authorized');

      if (updateApi.type === 'update') {
        status = await this.prisma.client.api.update({
          where: { apiKeyId: updateApi.apiKeyId },
          data: { status: !checkApi?.status },
        });

        await this.redisClient.del(`undefined:api_key:${status.secretKey}`);
      }

      if (updateApi.type === 'delete') {
        if (checkApi.reqCount > 500)
          throw new BadRequestException(
            'you cannot remove the token because it has reached the allowable limit',
          );
        status = await this.prisma.client.api.delete({
          where: { apiKeyId: updateApi.apiKeyId },
        });

        await this.redisClient.del(`undefined:api_key:${status.secretKey}`);
      }

      return status;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
