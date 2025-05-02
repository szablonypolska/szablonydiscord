import {
  BadGatewayException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateDto } from '../dto/create.dto';
import { PrismaService } from '@repo/shared';
import { Chat } from '../interfaces/chat.inteface';

@Injectable()
export class CreateService {
  constructor(private prisma: PrismaService) {}

  async createChat(data: CreateDto) {
    try {
      const getUser = await this.prisma.client.user.findUnique({
        where: { userId: data.userId },
        include: { chat: true },
      });

      if (!getUser) throw new UnauthorizedException('This user is not exists');

      const openChats = getUser.chat.filter((el: Chat) => el.status === 'OPEN');

      if (openChats.length > 4)
        throw new BadGatewayException({
          message: "you can't have 5 tickets open at the same time",
          status: 'moreTicket',
        });

      const createChat = await this.prisma.client.chat.create({
        data: {
          subject: data.subject,
          description: data.description,
          userId: data.userId,
        },
      });

      await this.prisma.client.message.create({
        data: {
          content:
            'Dziękujemy za stworzenie zgłoszenia. Wkrótce skontaktuje się z tobą nasza administracja.',
          type: 'ADMIN',
          chatId: createChat.id,
        },
      });

      return { chatId: createChat.id };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

// id String @id @default(uuid())
// createdAt DateTime @default(now())
// updatedAt DateTime @updatedAt
// subject String
// description String
// userId String
// agent String?
