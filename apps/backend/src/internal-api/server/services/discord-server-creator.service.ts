import { DiscordCreateCategoryService } from './category/discord-category.service';
import { DiscordCreateChannelService } from './channel/discord-channel.service';
import { DiscordCreateRolesService } from './role/discord-roles.service';
import { DiscordGuildService } from './guild/discord-guild.service';
import { Injectable } from '@nestjs/common';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';
import { PrismaService } from '@repo/shared';
import { Client } from 'discord.js-selfbot-v13';
import { Builder } from '../interfaces/builder.interface';
import { BuilderCode } from '../interfaces/builder-code.interface';

@Injectable()
export class DiscordServerCreatorService {
  constructor(
    private websocket: WebsocketGateway,
    private prisma: PrismaService,
    private createCategory: DiscordCreateCategoryService,
    private createChannel: DiscordCreateChannelService,
    private createRole: DiscordCreateRolesService,
    private configureGuild: DiscordGuildService,
  ) {}

  private client: Client;

  async createServer(
    token: string,
    config: BuilderCode,
    data: Builder,
  ): Promise<string> {
    try {
      this.client = new Client();
      await this.client.login(token);

      const guild = await this.configureGuild.createGuild(
        this.client,
        config,
        data,
      );

      const roleMap = await this.createRole.createRoles(
        guild,
        config.roles,
        data,
      );

      const categoryMap = await this.createCategory.createCategories(
        guild,
        config.categories,
        data,
        roleMap,
      );

      await this.createChannel.createChannels(
        guild,
        config.channels,
        categoryMap,
        roleMap,
        data,
      );

      const templates = await guild.createTemplate(
        config.details.title,
        config.details.description,
      );

      await this.client.destroy();

      this.websocket.server
        .to(`sessionId:${data.sessionId}`)
        .emit('update_template', {
          sessionId: data.sessionId,
          templateCode: templates.code,
        });
      await this.prisma.client.builder.update({
        where: { sessionId: data.sessionId },
        data: { templateCode: templates.code },
      });

      return templates.code;
    } catch (error) {
      console.error('Error in createServer:', error);
      if (this.client && this.client.isReady()) {
        await this.client.destroy();
      }
      throw error;
    }
  }
}
