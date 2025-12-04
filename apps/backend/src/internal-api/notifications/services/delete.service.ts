import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@repo/shared';
import { User } from 'src/interfaces/user.interface';
import { DeleteDto } from '../dto/delete.dto';

@Injectable()
export class DeleteService {
  constructor(private readonly prisma: PrismaService) {}

  async deleteNotification(data: DeleteDto) {
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

      if (findNotifications.length === 0) {
        throw new BadRequestException({
          ok: false,
          message: 'Notification not found',
        });
      }

      await this.prisma.client.notification.delete({
        where: { id: data.notificationId },
      });

      return { ok: true, message: 'Notification deleted' };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
