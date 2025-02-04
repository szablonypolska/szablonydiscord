import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { NotificationDto } from './dto/notification.dto';
import { PrismaService } from '@repo/shared';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly websocket: WebsocketGateway,
  ) {}

  async sendNotification(params: NotificationDto) {
    try {
      const data = {
        type: params.type,
        title: params.title,
        description: params.description,
        userId: params.userId,
      };

      await this.prisma.client.notification.create({ data });

      this.websocket.server.emit('notification', { data });
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('server error');
    }
  }
}
