import { Injectable } from '@nestjs/common';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';
import { PrismaService } from '@repo/shared';
import { Guild, CategoryChannel, Role } from 'discord.js-selfbot-v13';
import { Channel } from '../interfaces/server.interface';

@Injectable()
export class DiscordCreateChannelService {
  constructor(
    private websocket: WebsocketGateway,
    private prisma: PrismaService,
  ) {}

  async createChannels(
    guild: Guild,
    channels: Channel[],
    categoryMap: Map<string, CategoryChannel>,
    roleMap: Map<string, Role>,
    sessionId: string,
  ): Promise<void> {
    this.websocket.server.emit('update_channel_status', {
      sessionId,
      status: 'in_progress',
    });

    await this.prisma.client.generateStatus.update({
      where: { sessionId },
      data: { channelStatus: 'in_progress' },
    });

    for (const channelConfig of channels) {
      try {
        const category = categoryMap.get(channelConfig.categoryId);

        const channelOptions: any = {
          type: channelConfig.type === 'TEXT' ? 'GUILD_TEXT' : 'GUILD_VOICE',
          parent: category?.id,
          position: channelConfig.position,
        };

        if (channelConfig.type === 'TEXT') {
          if (channelConfig.topic) channelOptions.topic = channelConfig.topic;
          if (channelConfig.nsfw !== undefined)
            channelOptions.nsfw = channelConfig.nsfw;
          if (channelConfig.rateLimitPerUser !== undefined)
            channelOptions.rateLimitPerUser = channelConfig.rateLimitPerUser;
        }

        if (channelConfig.type === 'VOICE') {
          if (channelConfig.userLimit !== undefined)
            channelOptions.userLimit = channelConfig.userLimit;
          if (channelConfig.bitrate !== undefined)
            channelOptions.bitrate = channelConfig.bitrate;
        }

        const channel = await guild.channels.create(
          channelConfig.name,
          channelOptions,
        );

        if (channelConfig.permissions && channelConfig.permissions.length > 0) {
          const permissionOverwrites = channelConfig.permissions
            .map((perm) => {
              const role = roleMap.get(perm.roleId);
              if (!role) {
                return null;
              }

              return {
                id: role.id,
                allow: perm.allow,
                deny: perm.deny,
              };
            })
            .filter(Boolean);

          await channel.permissionOverwrites.set(permissionOverwrites);
        }

        this.websocket.server.emit('update_channel', {
          sessionId,
          id: channel.id,
          name: channel.name,
          type: channel.type === 'GUILD_TEXT' ? 0 : 2,
          parentId: channel.parentId,
          position: channel.position,
          private: channel.permissionOverwrites.cache.size > 0 ? true : false,
        });

        await this.prisma.client.channel.create({
          data: {
            sessionId,
            id: channel.id,
            name: channel.name,
            type: channel.type === 'GUILD_TEXT' ? 0 : 2,
            parentId: channel.parentId,
            position: channel.position,
            private: channel.permissionOverwrites.cache.size > 0 ? true : false,
          },
        });

      } catch (error) {
        this.websocket.server.emit('update_channel_status', {
          sessionId,
          status: 'error',
          channelError: true,
        });
        await this.prisma.client.generateStatus.update({
          where: { sessionId },
          data: { channelError: true },
        });

        throw error;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    this.websocket.server.emit('update_channel_status', {
      sessionId,
      status: 'done',
    });

    await this.prisma.client.generateStatus.update({
      where: { sessionId },
      data: { channelStatus: 'done' },
    });
  }
}
