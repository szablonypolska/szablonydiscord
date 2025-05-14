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
      this.websocket.server.emit('generate_data', {
        sessionId,
        status: 'done',
        rolesNumber: config.roles.length,
        categoryNumber: config.categories.length,
        channelNumber: config.channels.length,
      });
      await this.prisma.client.generateStatus.update({
        where: { sessionId },
        data: {
          aiAnalysisStatus: 'done',
          rolesNumber: config.roles.length,
          categoryNumber: config.categories.length,
          channelNumber: config.channels.length,
        },
      });
      const guild = await this.configureGuild.createGuild(
        config.serverConfig,
        sessionId,
      );

      await this.createRole.createRoles(guild, config.roles, sessionId);
      await this.createCategory.createCategories(
        guild,
        config.categories,
        sessionId,
      );
      await this.createChannel.createChannels(guild, config.channels);

      const templates = await guild.createTemplate(
        config.details.title,
        config.details.description,
      );

      await this.client.destroy();

      return templates.code;
    } catch (error) {
      if (this.client && this.client.isReady()) {
        await this.client.destroy();
      }
      throw error;
    }
  }
}
