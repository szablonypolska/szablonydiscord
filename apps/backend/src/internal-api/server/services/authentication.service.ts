import { Injectable } from '@nestjs/common';
import { PrismaService } from '@repo/shared';
import { Client } from 'discord.js-selfbot-v13';
import { TokenType } from '../interfaces/token.interface';
import { DiscordServerCreatorService } from './discord-server-creator.service';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';
import { Builder, BuilderProcessStatus } from '../interfaces/builder.interface';
import { BuilderEmitterService } from './emitter/builder-emitter.service';
import { BuilderCode } from '../interfaces/builder-code.interface';

@Injectable()
export class DiscordChooseToken {
  private client: Client;

  constructor(
    private prisma: PrismaService,
    private createServer: DiscordServerCreatorService,
    private websocket: WebsocketGateway,
    private builderEmitter: BuilderEmitterService,
  ) {}

  async authentication(config: BuilderCode, data: Builder) {
    let findIdAuthentication: { id: number } = { id: 0 };

    try {
      this.client = new Client();

      findIdAuthentication = data.builderProcess.stages.find(
        (stage) => stage.type === 'AUTHENTICATION',
      );

      await this.updateAuthenticationStatus(
        data.sessionId,
        BuilderProcessStatus.IN_PROGRESS,
        findIdAuthentication.id,
      );

      const allTokens: TokenType[] = await this.prisma.client.token.findMany(
        {},
      );

      if (allTokens.length === 0) throw new Error('No token in base');

      for await (const token of allTokens) {
        try {
          await this.client.login(token.token);
          if (
            this.client.user.username &&
            this.client.guilds.cache.size < 100
          ) {
            await this.updateAuthenticationStatus(
              data.sessionId,
              BuilderProcessStatus.COMPLETED,
              findIdAuthentication.id,
            );

            return this.createServer.createServer(token.token, config, data);
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

      this.builderEmitter.builderEmit(
        data.sessionId,
        { id: findIdAuthentication.id, status: BuilderProcessStatus.FAILED },
        'status_updated',
      );

      await this.prisma.client.builderStage.update({
        where: { id: findIdAuthentication.id },
        data: { status: 'FAILED', finishedAt: new Date() },
      });
    }
  }

  private async updateAuthenticationStatus(
    sessionId: string,
    status: BuilderProcessStatus,
    stageId: number,
  ) {
    this.builderEmitter.builderEmit(
      sessionId,
      { id: stageId, status },
      'status_updated',
    );

    await this.prisma.client.builderStage.update({
      where: {
        id: stageId,
      },
      data: {
        status,
        startedAt:
          status === BuilderProcessStatus.IN_PROGRESS ? new Date() : undefined,
        finishedAt:
          status === BuilderProcessStatus.COMPLETED ||
          status === BuilderProcessStatus.FAILED
            ? new Date()
            : undefined,
      },
    });
  }
}
