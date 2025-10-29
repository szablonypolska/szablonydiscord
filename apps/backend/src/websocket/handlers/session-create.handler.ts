import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { PrismaService } from '@repo/shared';

@Injectable()
export class SessionCreateHandler {
  constructor(private prisma: PrismaService) {}

  private readonly logger = new Logger(SessionCreateHandler.name);

  async handleSessionCreate(socket: Socket, id: string) {
    try {
      const checkIsExists = await this.prisma.client.builder.findUnique({
        where: { sessionId: id },
      });

      if (checkIsExists) {
        socket.join(`sessionId:${id}`);
        (socket as Socket & { sessionId: string }).sessionId = id;
        this.logger.log(`🟢 Joined: sessionId:${id}`);
      } else {
        throw new Error('SessionId not found in database');
      }
    } catch (err) {
      console.log(err);
      this.logger.warn('🔴 No sessionId');
    }
  }
}
