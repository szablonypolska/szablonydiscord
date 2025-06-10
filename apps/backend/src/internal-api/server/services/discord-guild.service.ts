import { Injectable } from '@nestjs/common';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';
import { PrismaService } from '@repo/shared';
import { Client, Guild } from 'discord.js-selfbot-v13';
import { ServerConfig } from '../interfaces/server.interface';

@Injectable()
export class DiscordGuildService {
  constructor(
    private websocket: WebsocketGateway,
    private prisma: PrismaService,
  ) {}

  async createGuild(
    client: Client,
    config: ServerConfig,
    sessionId: string,
  ): Promise<Guild> {
    this.websocket.server.emit('server_configure', {
      sessionId,
      status: 'in_progress',
    });

    await this.prisma.client.generateStatus.update({
      where: { sessionId },
      data: { configureServerStatus: 'in_progress' },
    });

    try {
      const guildOptions: any = {
        name: config.name,
      };

      if (config.icon) {
        guildOptions.icon = config.icon;
      }

      if (config.region) guildOptions.region = config.region;
      if (config.verificationLevel)
        guildOptions.verificationLevel = config.verificationLevel;
      if (config.explicitContentFilter)
        guildOptions.explicitContentFilter = config.explicitContentFilter;
      if (config.defaultMessageNotifications)
        guildOptions.defaultMessageNotifications =
          config.defaultMessageNotifications;

      if (!client || !client.guilds) {
        throw new Error('Discord client is not initialized properly');
      }

      const guild = await client.guilds.create(config.name, guildOptions);

      console.log('id', guild.id, guild);

      await new Promise((resolve) => setTimeout(resolve, 3000));

      await this.cleanupDefaultChannels(guild);
      await this.cleanupDefaultRoles(guild);

      this.websocket.server.emit('server_configure', {
        sessionId,
        status: 'done',
      });

      await this.prisma.client.generateStatus.update({
        where: { sessionId },
        data: { configureServerStatus: 'done' },
      });

      await new Promise((resolve) => setTimeout(resolve, 2000));
      return guild;
    } catch (error) {
      console.log(error);
      this.websocket.server.emit('server_configure', {
        sessionId,
        status: 'error',
        configureServerError: true,
      });
      await this.prisma.client.generateStatus.update({
        where: { sessionId },
        data: { configureServerError: true },
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
