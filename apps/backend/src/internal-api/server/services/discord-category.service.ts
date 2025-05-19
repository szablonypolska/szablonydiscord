import { Injectable } from '@nestjs/common';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';
import { PrismaService } from '@repo/shared';
import { Guild, CategoryChannel, Role } from 'discord.js-selfbot-v13';
import { Category } from '../interfaces/server.interface';

@Injectable()
export class DiscordCreateCategoryService {
  constructor(
    private websocket: WebsocketGateway,
    private prisma: PrismaService,
  ) {}

  private categoryMap: Map<string, CategoryChannel> = new Map();

  async createCategories(
    guild: Guild,
    categories: Category[],
    sessionId: string,
    roleMap: Map<string, Role>,
  ): Promise<Map<string, CategoryChannel>> {
    this.categoryMap = new Map();

    this.websocket.server.emit('update_category_status', {
      sessionId,
      status: 'in_progress',
    });

    await this.prisma.client.generateStatus.update({
      where: { sessionId },
      data: { categoryStatus: 'in_progress' },
    });

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

          await category.permissionOverwrites.set(permissionOverwrites);
        }

        this.websocket.server.emit('update_category', {
          sessionId,
          name: category.name,
          id: category.id,
          parentId: category.parentId,
          position: category.position,
          type: category.type === 'GUILD_CATEGORY' && 4,
        });

        await this.prisma.client.category.create({
          data: { sessionId, name: category.name, id: category.id },
        });

        this.categoryMap.set(categoryConfig.id, category);

        console.log('kategoria', category.id, category.parentId);
      } catch (error) {
        this.websocket.server.emit('update_category_status', {
          sessionId,
          status: 'error',
          categoryError: true,
        });
        await this.prisma.client.generateStatus.update({
          where: { sessionId },
          data: { categoryError: true },
        });
        throw error;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    this.websocket.server.emit('update_category_status', {
      sessionId,
      status: 'done',
    });

    await this.prisma.client.generateStatus.update({
      where: { sessionId },
      data: { categoryStatus: 'done' },
    });

    return this.categoryMap;
  }
}
