import { Injectable } from '@nestjs/common';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';
import { PrismaService } from '@repo/shared';
import { Guild } from 'discord.js-selfbot-v13';
import { Category } from '../interfaces/server.interface';

@Injectable()
export class DiscordCreateCategoryService {
  categoryMap: any;
  roleMap: any;
  constructor(
    private websocket: WebsocketGateway,
    private prisma: PrismaService,
  ) {}

  async createCategories(
    guild: Guild,
    categories: Category[],
    sessionId: string,
  ): Promise<void> {
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

        this.websocket.server.emit('update_category', {
          sessionId,
          name: category.name,
        });
        await this.prisma.client.category.create({
          data: { sessionId, name: category.name },
        });

        this.categoryMap.set(categoryConfig.id, category);
      } catch (error) {
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
  }
}
