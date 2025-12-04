import { Injectable } from '@nestjs/common';
import { PrismaService } from '@repo/shared';
import { Client } from 'discord.js-selfbot-v13';
import { TokenType } from '../interfaces/token.interface';
import { DiscordServerCreatorService } from './discord-server-creator.service';
import { Builder, BuilderProcessStatus } from '../interfaces/builder.interface';
import { BuilderEmitterService } from './emitter/builder-emitter.service';
import { BuilderCode } from '../interfaces/builder-code.interface';
import { NotificationsService } from 'src/notifications/services/notifications.service';
import { decrypt } from 'src/common/utils/encrypt/decrypt';
import { User } from '../../../interfaces/user.interface';

@Injectable()
export class DiscordChooseToken {
  private client: Client;

  constructor(
    private prisma: PrismaService,
    private createServer: DiscordServerCreatorService,
    private builderEmitter: BuilderEmitterService,
    private notifications: NotificationsService,
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
        data.userId,
      );

      const user: User = await this.prisma.client.user.findUnique({
        where: { userId: data.userId },
      });
      const decryptedToken = decrypt(user.token);

      try {
        await this.client.login(decryptedToken);
        if (this.client.user.username && this.client.guilds.cache.size < 100) {
          await this.updateAuthenticationStatus(
            data.sessionId,
            BuilderProcessStatus.COMPLETED,
            findIdAuthentication.id,
            data.userId,
          );
          return this.createServer.createServer(decryptedToken, config, data);
        }
      } catch (err) {
        console.log(err);
        this.client.destroy();
        throw new Error('User token invalid');
      }
    } catch (error) {
      console.log(error);
      await this.updateAuthenticationStatus(
        data.sessionId,
        BuilderProcessStatus.FAILED,
        findIdAuthentication.id,
        data.userId,
      );
    }
  }

  private async updateAuthenticationStatus(
    sessionId: string,
    status: BuilderProcessStatus,
    stageId: number,
    userId: string,
  ) {
    this.builderEmitter.builderEmit(
      sessionId,
      { id: stageId, status },
      'status_updated',
    );

    if (status === BuilderProcessStatus.FAILED) {
      await this.notifications.sendErrorNotificationBuilder(userId);
    }

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
