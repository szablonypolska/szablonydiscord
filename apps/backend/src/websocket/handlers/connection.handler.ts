import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@Injectable()
export class ConnectionHandler {
  private readonly logger = new Logger(ConnectionHandler.name);

  async handleConnection(socket: Socket) {
    const { userId } = socket.handshake.auth;
    if (!userId) {
      this.logger.warn('🔴 No userid');
      socket.disconnect(true);
      return;
    }

    socket.join(`userId:${userId}`);
    (socket as Socket & { userId: string }).userId = userId;

    this.logger.log(`🟢 Connected: user  userId:${userId}`);
  }
}
