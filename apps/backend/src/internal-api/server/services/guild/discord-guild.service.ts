import { Injectable } from '@nestjs/common';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';
import { PrismaService } from '@repo/shared';
import { Client, Guild } from 'discord.js-selfbot-v13';
import { Builder } from '../../interfaces/builder.interface';
import { BuilderEmitterService } from '../emitter/builder-emitter.service';
import { BuilderCode } from '../../interfaces/builder-code.interface';

@Injectable()
export class DiscordGuildService {
  constructor(
    private prisma: PrismaService,
    private builderEmitter: BuilderEmitterService,
  ) {}

  async createGuild(
    client: Client,
    config: BuilderCode,
    data: Builder,
  ): Promise<Guild> {
    let findIdConfigureServer: { id: number } = { id: 0 };

    try {
      findIdConfigureServer = data.builderProcess.stages.find(
        (stage) => stage.type === 'CONFIGURE_SERVER',
      );

      this.builderEmitter.builderEmit(
        data.sessionId,
        { id: findIdConfigureServer.id, status: 'IN_PROGRESS' },
        'status_updated',
      );

      await this.prisma.client.builderStage.update({
        where: { id: findIdConfigureServer.id },
        data: { status: 'IN_PROGRESS', startedAt: new Date() },
      });

      const guildOptions: any = {
        name: config.serverConfig.name,
      };

      if (config.serverConfig.icon) {
        guildOptions.icon = config.serverConfig.icon;
      }

      if (config.serverConfig.region)
        guildOptions.region = config.serverConfig.region;
      if (config.serverConfig.verificationLevel)
        guildOptions.verificationLevel = config.serverConfig.verificationLevel;
      if (config.serverConfig.explicitContentFilter)
        guildOptions.explicitContentFilter =
          config.serverConfig.explicitContentFilter;
      if (config.serverConfig.defaultMessageNotifications)
        guildOptions.defaultMessageNotifications =
          config.serverConfig.defaultMessageNotifications;

      if (!client || !client.guilds) {
        throw new Error('Discord client is not initialized properly');
      }

      const guild = await client.guilds.create(
        config.serverConfig.name,
        guildOptions,
      );

      await new Promise((resolve) => setTimeout(resolve, 3000));

      await this.cleanupDefaultChannels(guild);
      await this.cleanupDefaultRoles(guild);

      this.builderEmitter.builderEmit(
        data.sessionId,
        { id: findIdConfigureServer.id, status: 'COMPLETED' },
        'status_updated',
      );

      await this.prisma.client.builderStage.update({
        where: { id: findIdConfigureServer.id },
        data: { status: 'COMPLETED', finishedAt: new Date() },
      });

      await guild.setCommunity(true);

      await new Promise((resolve) => setTimeout(resolve, 2000));
      return guild;
    } catch (error) {
      console.log(error);

      this.builderEmitter.builderEmit(
        data.sessionId,
        { id: findIdConfigureServer.id, status: 'FAILED' },
        'status_updated',
      );

      await this.prisma.client.builderStage.update({
        where: { id: findIdConfigureServer.id },
        data: { status: 'FAILED', finishedAt: new Date() },
      });

      throw error;
    }
  }

  private async cleanupDefaultChannels(guild: Guild): Promise<void> {
    try {
      const channels = await guild.channels.fetch();

      for (const [id, channel] of channels) {
        try {
          await channel.delete();
        } catch (error) {
          console.log(`Błąd podczas usuwania kanału ${channel.name}:`, error);
        }
      }
    } catch (error) {
      console.log('Błąd podczas usuwania domyślnych kanałów:', error);
    }
  }

  private async cleanupDefaultRoles(guild: Guild): Promise<void> {
    try {
      const roles = await guild.roles.fetch();

      for (const [id, role] of roles) {
        try {
          if (!role.managed && role.name !== '@everyone') {
            await role.delete();
          }
        } catch (error) {
          console.log(`Błąd podczas usuwania roli ${role.name}:`, error);
        }
      }
    } catch (error) {
      console.log('Błąd podczas usuwania domyślnych ról:', error);
    }
  }
}
