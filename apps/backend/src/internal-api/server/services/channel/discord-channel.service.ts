import { Injectable } from '@nestjs/common';
import { PrismaService } from '@repo/shared';
import { Guild, CategoryChannel, Role } from 'discord.js-selfbot-v13';
import { Builder } from '../../interfaces/builder.interface';
import { Channels } from '../../interfaces/builder-code.interface';
import { BuilderEmitterService } from '../emitter/builder-emitter.service';

@Injectable()
export class DiscordCreateChannelService {
  constructor(
    private prisma: PrismaService,
    private builderEmitter: BuilderEmitterService,
  ) {}

  async createChannels(
    guild: Guild,
    channels: Channels[],
    categoryMap: Map<string, CategoryChannel>,
    roleMap: Map<string, Role>,
    data: Builder,
  ): Promise<void> {
    let findIdCreateChannelsStage: { id: number } = { id: 0 };

    try {
      findIdCreateChannelsStage = data.builderProcess.stages.find(
        (stage) => stage.type === 'CHANNELS_CREATE',
      );

      this.builderEmitter.inProgressEmit(
        data.sessionId,
        findIdCreateChannelsStage.id,
      );

      const [, createChannelStage] = await this.prisma.client.$transaction([
        this.prisma.client.builderStage.update({
          where: { id: findIdCreateChannelsStage.id },
          data: { status: 'IN_PROGRESS', startedAt: new Date() },
        }),
        this.prisma.client.channelStage.create({
          data: {
            builderStageId: findIdCreateChannelsStage.id,
          },
        }),
      ]);

      for (const channelConfig of channels) {
        try {
          const category = categoryMap.get(channelConfig.categoryId);

          const channelTypeMap = {
            TEXT: 'GUILD_TEXT',
            VOICE: 'GUILD_VOICE',
            ANNOUNCEMENT: 'GUILD_NEWS',
            NEWS: 'GUILD_NEWS',
            FORUM: 'GUILD_FORUM',
            STAGE: 'GUILD_STAGE_VOICE',
            STAGE_VOICE: 'GUILD_STAGE_VOICE',
          };

          const channelOptions: any = {
            type: channelTypeMap[channelConfig.type] || 'GUILD_TEXT',
            parent: category?.id,
            position: channelConfig.position,
          };

          if (['TEXT', 'ANNOUNCEMENT', 'NEWS'].includes(channelConfig.type)) {
            if (channelConfig.topic) channelOptions.topic = channelConfig.topic;
            if (channelConfig.nsfw !== undefined)
              channelOptions.nsfw = channelConfig.nsfw;
            if (channelConfig.rateLimitPerUser !== undefined)
              channelOptions.rateLimitPerUser = channelConfig.rateLimitPerUser;
          }

          if (['VOICE', 'STAGE', 'STAGE_VOICE'].includes(channelConfig.type)) {
            if (channelConfig.userLimit !== undefined)
              channelOptions.userLimit = channelConfig.userLimit;
            if (channelConfig.bitrate !== undefined)
              channelOptions.bitrate = channelConfig.bitrate;
          }

          if (['STAGE', 'STAGE_VOICE'].includes(channelConfig.type)) {
            if (channelConfig.rtcRegion !== undefined)
              channelOptions.rtcRegion = channelConfig.rtcRegion;
          }

          if (channelConfig.type === 'FORUM') {
            if (channelConfig.topic) channelOptions.topic = channelConfig.topic;
            if (channelConfig.nsfw !== undefined)
              channelOptions.nsfw = channelConfig.nsfw;
            if (channelConfig.rateLimitPerUser !== undefined)
              channelOptions.rateLimitPerUser = channelConfig.rateLimitPerUser;
            if (channelConfig.defaultAutoArchiveDuration !== undefined)
              channelOptions.defaultAutoArchiveDuration =
                channelConfig.defaultAutoArchiveDuration;
            if (channelConfig.availableTags !== undefined)
              channelOptions.availableTags = channelConfig.availableTags;
            if (channelConfig.defaultReactionEmoji !== undefined)
              channelOptions.defaultReactionEmoji =
                channelConfig.defaultReactionEmoji;
            if (channelConfig.defaultThreadRateLimitPerUser !== undefined)
              channelOptions.defaultThreadRateLimitPerUser =
                channelConfig.defaultThreadRateLimitPerUser;
            if (channelConfig.defaultSortOrder !== undefined)
              channelOptions.defaultSortOrder = channelConfig.defaultSortOrder;
          }

          const channel = await guild.channels.create(
            channelConfig.name,
            channelOptions,
          );

          if (
            channelConfig.permissions &&
            channelConfig.permissions.length > 0
          ) {
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

          const channelTypeToNumber = {
            GUILD_TEXT: 0,
            GUILD_VOICE: 2,
            GUILD_NEWS: 5,
            GUILD_STAGE_VOICE: 13,
            GUILD_FORUM: 15,
          };

          this.builderEmitter.builderEmit(
            data.sessionId,
            {
              id: channel.id,
              name: channel.name,
              type: channelTypeToNumber[channel.type] || 0,
              parentId: channel.parentId,
              position: channel.position,
              private:
                channel.permissionOverwrites.cache.size > 0 ? true : false,
            },
            'channels_created',
          );

          await this.prisma.client.channel.create({
            data: {
              stageId: createChannelStage.id,
              id: channel.id,
              name: channel.name,
              type: channelTypeToNumber[channel.type] || 0,
              parentId: channel.parentId,
              position: channel.position,
              private:
                channel.permissionOverwrites.cache.size > 0 ? true : false,
            },
          });
        } catch (error) {
          this.error(data, findIdCreateChannelsStage.id);

          throw error;
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      this.builderEmitter.completeEmit(
        data.sessionId,
        findIdCreateChannelsStage.id,
      );

      await this.prisma.client.builderStage.update({
        where: { id: findIdCreateChannelsStage.id },
        data: { status: 'COMPLETED', finishedAt: new Date() },
      });
    } catch (err) {
      console.log(err);
      this.error(data, findIdCreateChannelsStage.id);
      throw err;
    }
  }

  private async error(data: Builder, id: number) {
    this.builderEmitter.failedEmit(data.sessionId, id);

    await this.prisma.client.builderStage.update({
      where: { id },
      data: { status: 'FAILED', finishedAt: new Date() },
    });
  }
}
