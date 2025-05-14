import { Injectable } from '@nestjs/common';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';
import { PrismaService } from '@repo/shared';
import { Guild } from 'discord.js-selfbot-v13';
import { Channel } from '../interfaces/server.interface';

@Injectable()
export class DiscordCreateChannelService {
  categoryMap: any;
    roleMap: any;
  constructor(
    private websocket: WebsocketGateway,
    private prisma: PrismaService,
  ) {}

  async createChannels(guild: Guild, channels: Channel[]): Promise<void> {
    for (const channelConfig of channels) {
      try {
        const category = this.categoryMap.get(channelConfig.categoryId);

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
              const role = this.roleMap.get(perm.roleId);
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
      } catch (error) {
        throw error;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}
