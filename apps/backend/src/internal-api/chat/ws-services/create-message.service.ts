import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { TempMessage } from 'src/interfaces/temp-message.interace';
import { PrismaService } from '@repo/shared';
import { WebsocketGateway } from '../../../websocket/websocket.gateway';

@Injectable()
export class CreateMessageService {
  constructor(
    @Inject(forwardRef(() => WebsocketGateway))
    private readonly websocket: WebsocketGateway,
    private prisma: PrismaService,
  ) {}

  async createMessage(payload: TempMessage) {
    try {
      const createMessage = await this.prisma.client.message.create({
        data: {
          content: payload.content,
          type: payload.type,
          author: payload.author,
          authorId: payload.authorId,
          chatId: payload.chatId,
        },
      });

      const message = { ...createMessage, tempId: payload.tempId };

      console.log(message);

      this.websocket.server.emit('message:new', message);
    } catch (err) {
      console.log(err);
    }
  }
}
