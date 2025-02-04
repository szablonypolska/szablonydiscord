import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@repo/shared';
import { BodyData } from '../interfaces/create.interface';
import { v4 as uuidv4 } from 'uuid';
import ShortUniqueId from 'short-unique-id';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class CreateApiKeysService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notification: NotificationsService,
  ) {}
  private uid = new ShortUniqueId({ length: 15 });

  async createApi(createApiBody: BodyData): Promise<object> {
    try {
      const checkUserIsExists = await this.prisma.client.user.findUnique({
        where: { userId: createApiBody.userId },
        include: { api: true },
      });

      if (!checkUserIsExists) throw new NotFoundException('user not found');
      if (checkUserIsExists.api.length >= checkUserIsExists.limitApiKey)
        throw new BadRequestException(
          'The API limit per account has been reached',
        );
      if (createApiBody.requestCount > 100000)
        throw new BadRequestException('the number of request is too large');

      const create = await this.prisma.client.api.create({
        data: {
          apiKeyId: this.uid.rnd(),
          name: createApiBody.name,
          secretKey: uuidv4(),
          monthlyLimit: createApiBody.requestCount,
          userId: createApiBody.userId,
        },
      });

      this.notification.sendNotification({
        type: 'success',
        title: 'Klucz API został stworzony',
        description: `Nowy ApiKey "${createApiBody.name}" został pomyślnie utworzony`,
        userId: createApiBody.userId,
      });

      return create;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
