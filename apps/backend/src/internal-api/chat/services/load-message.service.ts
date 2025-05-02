import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '@repo/shared';
import { LoadMessageDto } from '../dto/load-message.dto';

@Injectable()
export class LoadMessageService {
  constructor(private prisma: PrismaService) {}

  async loadMessage(data: LoadMessageDto) {
    try {
      const getUser = await this.prisma.client.user.findUnique({
        where: { userId: data.userId },
      });

      if (!getUser) throw new UnauthorizedException('You are not login');

      const getMessage = await this.prisma.client.chat.findUnique({
        where: { id: data.chatId },
        include: { message: true },
      });

      if (!getMessage) throw new BadRequestException('This chat is no exists');

      console.log(getMessage);

      return { data: getMessage.message };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
