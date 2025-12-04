import { BadRequestException, Injectable } from '@nestjs/common';
import { ReadDto } from '../dto/read.dto';
import { PrismaService } from '@repo/shared';
import { User } from 'src/interfaces/user.interface';

@Injectable()
export class ReadService {
  constructor(private readonly prisma: PrismaService) {}

  async markAsRead(data: ReadDto) {
    console.log('wywylouje sie');
    try {
      const user: User | null = await this.prisma.client.user.findUnique({
        where: { userId: data.userId },
        include: { notification: true },
      });

      if (!user) {
        throw new BadRequestException({ ok: false, message: 'User not found' });
      }

      const findNotifications = user.notification.filter(
        (notification) => notification.id === data.notificationId,
      );

      if (findNotifications.length === 0 && !data.all) {
        throw new BadRequestException({
          ok: false,
          message: 'Notification not found',
        });
      }

      if (data.all) {
        await this.prisma.client.notification.updateMany({
          where: { userId: data.userId, isRead: false },
          data: { isRead: true },
        });
      } else {
        await this.prisma.client.notification.update({
          where: { id: data.notificationId },
          data: { isRead: true },
        });
      }

      return { ok: true, message: 'Notification marked as read' };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
