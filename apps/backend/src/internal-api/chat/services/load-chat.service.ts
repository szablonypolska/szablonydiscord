import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoadChatDto } from '../dto/load-chat.dto';
import { PrismaService } from '@repo/shared';

@Injectable()
export class LoadChatService {
  constructor(private prisma: PrismaService) {}

  async loadChat(data: LoadChatDto) {
    try {
      const getUser = await this.prisma.client.user.findUnique({
        where: { userId: data.userId },
        include: { chat: true },
      });

      if (!getUser) throw new UnauthorizedException('You are not login');

      return { data: getUser.chat.reverse() };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
