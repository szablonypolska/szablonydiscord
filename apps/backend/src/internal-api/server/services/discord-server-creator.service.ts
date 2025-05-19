import { DiscordCreateCategoryService } from './discord-category.service';
import { DiscordCreateChannelService } from './discord-channel.service';
import { DiscordCreateRolesService } from './discord-roles.service';
import { DiscordGuildService } from './discord-guild.service';
import { Injectable } from '@nestjs/common';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';
import { PrismaService } from '@repo/shared';
import { Client } from 'discord.js-selfbot-v13';
import { ServerCreationConfig } from '../interfaces/server.interface';

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
    config: ServerCreationConfig,
    sessionId: string,
  ): Promise<string> {
    try {
      this.client = new Client();
      await this.client.login(token);

      const guild = await this.configureGuild.createGuild(
        this.client,
        config.serverConfig,
        sessionId,
      );

      const roleMap = await this.createRole.createRoles(
        guild,
        config.roles,
        sessionId,
      );

      const categoryMap = await this.createCategory.createCategories(
        guild,
        config.categories,
        sessionId,
        roleMap,
      );

      await this.createChannel.createChannels(
        guild,
        config.channels,
        categoryMap,
        roleMap,
        sessionId,
      );

      const templates = await guild.createTemplate(
        config.details.title,
        config.details.description,
      );

      await this.client.destroy();

      this.websocket.server.emit('update_template', {
        sessionId,
        templateCode: templates.code,
      });
      await this.prisma.client.generateStatus.update({
        where: { sessionId },
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
