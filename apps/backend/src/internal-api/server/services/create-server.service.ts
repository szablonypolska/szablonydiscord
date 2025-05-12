import { Injectable } from '@nestjs/common';
import {
  Client,
  Guild,
  CategoryChannel,
  Role,
  ColorResolvable,
} from 'discord.js-selfbot-v13';
import {
  ServerConfig,
  Category,
  Channel,
  ServerRole,
  ServerCreationConfig,
} from '../interfaces/server.interface';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';
import { PrismaService } from '@repo/shared';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { prompt } from '../instructions/ai-prompt.json';

@Injectable()
export class DiscordServerCreatorService {
  constructor(
    private readonly websocket: WebsocketGateway,
    private prisma: PrismaService,
  ) {}

  private client: Client;
  private roleMap: Map<string, Role> = new Map();
  private categoryMap: Map<string, CategoryChannel> = new Map();

  async generate(description: string, token: string, id: string) {
    try {
      this.websocket.server.emit('generate_data', {
        sessionId: id,
        status: 'in_progress',
      });
      await this.prisma.client.generateStatus.update({
        where: { sessionId: id },
        data: { aiAnalysisStatus: 'in_progress' },
      });
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

      const promptGenerate = `Opis: ${description}, ${prompt}`;

      const result = await model.generateContent(promptGenerate);
      const text = result.response
        .text()
        .replace(/```(json)?\n?/g, '')
        .trim();

      const config = JSON.parse(text);

      this.createServer(token, config, id);
    } catch (err) {
      console.log(err);
    }
  }

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
      const guild = await this.createGuild(config.serverConfig, sessionId);

      await this.createRoles(guild, config.roles, sessionId);
      await this.createCategories(guild, config.categories);
      await this.createChannels(guild, config.channels);

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

  private async createGuild(
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

    const guild = await this.client.guilds.create(config.name, guildOptions);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    try {
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

          this.websocket.server.emit('server_configure', {
            sessionId,
            status: 'done',
          });
          await this.prisma.client.generateStatus.update({
            where: { sessionId },
            data: { configureServerStatus: 'done' },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));

    return guild;
  }

  private async createRoles(
    guild: Guild,
    roles: ServerRole[],
    sessionId: string,
  ): Promise<void> {
    const sortedRoles = [...roles].sort((a, b) => b.position - a.position);
    let createdRole: number = 0;
    this.websocket.server.emit('update_roles_status', {
      sessionId,
      status: 'in_progress',
    });
    await this.prisma.client.generateStatus.update({
      where: { sessionId },
      data: { rolesStatus: 'in_progress' },
    });

    const everyoneRole = guild.roles.everyone;
    this.roleMap.set('everyone', everyoneRole);

    for (const roleConfig of sortedRoles) {
      try {
        let colorValue: ColorResolvable;
        if (
          typeof roleConfig.color === 'string' &&
          roleConfig.color.startsWith('#')
        ) {
          colorValue = parseInt(
            roleConfig.color.substring(1),
            16,
          ) as ColorResolvable;
        } else {
          colorValue = roleConfig.color as ColorResolvable;
        }

        const role = await guild.roles.create({
          name: roleConfig.name,
          color: colorValue,
          hoist: roleConfig.hoist,
          position: roleConfig.position,
          permissions: roleConfig.permissions,
          mentionable: roleConfig.mentionable,
        });

        createdRole++;

        console.log(role.name, role.color);

        this.websocket.server.emit('update_roles', {
          sessionId,
          name: role.name,
          color: role.color,
        });
        await this.prisma.client.role.create({
          data: { sessionId, name: role.name, color: String(role.color) },
        });

        this.roleMap.set(roleConfig.id, role);
      } catch (error) {
        throw error;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    this.websocket.server.emit('update_roles_status', {
      sessionId,
      status: 'done',
    });
    await this.prisma.client.generateStatus.update({
      where: { sessionId },
      data: { rolesStatus: 'done' },
    });
  }

  private async createCategories(
    guild: Guild,
    categories: Category[],
  ): Promise<void> {
    for (const categoryConfig of categories) {
      try {
        const category = await guild.channels.create(categoryConfig.name, {
          type: 'GUILD_CATEGORY',
          position: categoryConfig.position,
        });

        if (
          categoryConfig.permissions &&
          categoryConfig.permissions.length > 0
        ) {
          const permissionOverwrites = categoryConfig.permissions
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

          await category.permissionOverwrites.set(permissionOverwrites);
        }

        this.categoryMap.set(categoryConfig.id, category);
      } catch (error) {
        throw error;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  private async createChannels(
    guild: Guild,
    channels: Channel[],
  ): Promise<void> {
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
