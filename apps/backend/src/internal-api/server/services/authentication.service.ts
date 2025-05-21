import { Injectable } from '@nestjs/common';
import { PrismaService } from '@repo/shared';
import { Client } from 'discord.js-selfbot-v13';
import { TokenType } from '../interfaces/token.interface';
import { ServerCreationConfig } from '../interfaces/server.interface';
import { DiscordServerCreatorService } from './discord-server-creator.service';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';

@Injectable()
export class DiscordChooseToken {
  private client: Client;

  constructor(
    private prisma: PrismaService,
    private createServer: DiscordServerCreatorService,
    private websocket: WebsocketGateway,
  ) {}

  async authentication(config: ServerCreationConfig, sessionId: string) {
    try {
      this.client = new Client();

      await this.updateAuthenticationStatus(sessionId, 'in_progress');

      const allTokens: TokenType[] = await this.prisma.client.token.findMany(
        {},
      );

      if (allTokens.length === 0) throw new Error('No token in base');

      for await (const token of allTokens) {
        try {
          await this.client.login(token.token);
          console.log('przechodze', token.token);

          if (
            this.client.user.username &&
            this.client.guilds.cache.size < 100
          ) {
            console.log(token.token);

            await this.updateAuthenticationStatus(sessionId, 'done');

            return this.createServer.createServer(
              token.token,
              config,
              sessionId,
            );
          } else {
            await this.prisma.client.token.delete({ where: { id: token.id } });
          }

          this.client.destroy();
        } catch (error) {
          console.log(error);
          await this.prisma.client.token.delete({ where: { id: token.id } });
          this.client.destroy();
        }
      }
    } catch (error) {
      console.log(error);

      this.websocket.server.emit('update_status_authentication', {
        sessionId,
        status: 'error',
        authenticationError: true,
      });

      await this.prisma.client.generateStatus.update({
        where: { sessionId },
        data: { authenticationError: true },
      });
    }
  }

  private async updateAuthenticationStatus(
    sessionId: string,
    status: 'in_progress' | 'done' | 'error',
  ) {
    this.websocket.server.emit('update_status_authentication', {
      sessionId,
      status,
    });

    await this.prisma.client.generateStatus.update({
      where: { sessionId },
      data: { authenticationStatus: status },
    });
  }
}
