import { Injectable } from '@nestjs/common';
import { PrismaService } from '@repo/shared';
import { Guild, CategoryChannel, Role } from 'discord.js-selfbot-v13';
import { Builder } from '../../interfaces/builder.interface';
import { BuilderEmitterService } from '../emitter/builder-emitter.service';

@Injectable()
export class CreateCategoriesService {
  constructor(
    private prisma: PrismaService,
    private builderEmitter: BuilderEmitterService,
  ) {}

  private categoryMap: Map<string, CategoryChannel> = new Map();

  async createCategories(
    id: number,
    guild: Guild,
    categories: any[],
    roleMap: Map<string, Role>,
    data: Builder,
  ): Promise<void> {
    try {
      this.categoryMap = new Map();

      const [, createCategoryStage] = await this.prisma.client.$transaction([
        this.prisma.client.builderStage.update({
          where: { id },
          data: { status: 'IN_PROGRESS', startedAt: new Date() },
        }),
        this.prisma.client.categoryStage.create({
          data: {
            builderStageId: id,
          },
        }),
      ]);

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
          this.builderEmitter.builderEmit(
            data.sessionId,
            {
              id,
              name: category.name,
              categoryId: category.id,
              parentId: category.parentId,
              position: category.position,
              type: category.type === 'GUILD_CATEGORY' && 4,
            },
            'categories_created',
          );

          await this.prisma.client.category.create({
            data: {
              stageId: createCategoryStage.id,
              parentId: category.parentId ?? '',
              position: category.position,
              name: category.name,
              id: category.id,
              type: 4,
              private: false,
            },
          });

          this.categoryMap.set(categoryConfig.id, category);
        } catch (error) {
          throw error;
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
