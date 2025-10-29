import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { NotificationDto } from '../dto/notification.dto';
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
      const { type, title, description, userId } = params;

      const data = await this.prisma.client.notification.create({
        data: { type, title, description, userId },
      });

      this.websocket.server
        .to(`userId:${userId}`)
        .emit('notification', { data });
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('server error');
    }
  }
}
