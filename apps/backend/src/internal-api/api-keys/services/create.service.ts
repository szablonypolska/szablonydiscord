import { Injectable } from '@nestjs/common';
import { PrismaService } from '@repo/shared';
import { BodyData } from '../interfaces/create.interface';
import { v4 as uuidv4 } from 'uuid';
import ShortUniqueId from 'short-unique-id';

@Injectable()
export class CreateApiKeysService {
  constructor(private readonly prisma: PrismaService) {}
  private uid = new ShortUniqueId({ length: 15 });

  async createApi(createApiBody: BodyData): Promise<string> {
    try {
      const create = await this.prisma.client.api.create({
        data: {
          apiKeyId: this.uid.rnd(),
          name: createApiBody.name,
          secretKey: uuidv4(),
          monthlyLimit: createApiBody.requestCount,
          userId: createApiBody.userId,
        },
      });

      return create;
    } catch (err) {
      console.log(err);
    }
  }
}
