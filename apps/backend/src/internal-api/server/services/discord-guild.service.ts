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

      await new Promise((resolve) => setTimeout(resolve, 3000));

      await this.cleanupDefaultChannels(guild);
      
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
    const channels = await guild.channels.fetch();

    for (const [id, channel] of channels) {
      const channelName = channel.name.toLowerCase();
      const channelType = channel.type;

      if (
        channelName === 'ogólny' ||
        channelName === 'general' ||
        channelName === 'ogolny' ||
        channelName === 'ogólne' ||
        channelName === 'general-voice' ||
        channelName === 'ogolne'
      ) {
        await channel.delete();
      }

      if (channelType === 'GUILD_CATEGORY') {
        const categoryName = channelName.toLowerCase();
        if (
          categoryName === 'kanały tekstowe' ||
          categoryName === 'text channels' ||
          categoryName === 'kanaly tekstowe' ||
          categoryName === 'textkanalen' ||
          categoryName === 'canais de texto' ||
          categoryName === 'canales de texto' ||
          categoryName === 'textuele kanalen' ||
          categoryName === 'canaux textuels' ||
          categoryName === 'textkanäle' ||
          categoryName === 'testkanallar' ||
          categoryName === 'канали с текст' ||
          categoryName === 'textové kanály' ||
          categoryName === 'kanały głosowe' ||
          categoryName === 'voice channels' ||
          categoryName === 'kanaly glosowe' ||
          categoryName === 'spraakkanalen' ||
          categoryName === 'canais de voz' ||
          categoryName === 'canales de voz' ||
          categoryName === 'sprach-kanäle' ||
          categoryName === 'vocale kanalen' ||
          categoryName === 'canaux vocaux' ||
          categoryName === 'röstkanaler' ||
          categoryName === 'гласови канали' ||
          categoryName === 'hlasové kanály'
        ) {
          await channel.delete();
        }
      }
    }
  }
}