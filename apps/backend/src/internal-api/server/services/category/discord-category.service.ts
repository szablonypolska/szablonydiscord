import { Injectable } from '@nestjs/common';
import { PrismaService } from '@repo/shared';
import { Guild, CategoryChannel, Role } from 'discord.js-selfbot-v13';
import { Builder } from '../../interfaces/builder.interface';
import { BuilderEmitterService } from '../emitter/builder-emitter.service';
import { Categories } from '../../interfaces/builder-code.interface';

@Injectable()
export class DiscordCreateCategoryService {
  constructor(
    private prisma: PrismaService,
    private builderEmitter: BuilderEmitterService,
  ) {}

  private categoryMap: Map<string, CategoryChannel> = new Map();

  async createCategories(
    guild: Guild,
    categories: Categories[],
    data: Builder,
    roleMap: Map<string, Role>,
  ): Promise<Map<string, CategoryChannel>> {
    let findIdCreateCategoriesStage: { id: number } = { id: 0 };

    try {
      findIdCreateCategoriesStage = data.builderProcess.stages.find(
        (stage) => stage.type === 'CATEGORIES_CREATE',
      );

      this.categoryMap = new Map();

      this.builderEmitter.builderEmit(
        data.sessionId,
        { id: findIdCreateCategoriesStage.id, status: 'IN_PROGRESS' },
        'status_updated',
      );

      const [, createCategoryStage] = await this.prisma.client.$transaction([
        this.prisma.client.builderStage.update({
          where: { id: findIdCreateCategoriesStage.id },
          data: { status: 'IN_PROGRESS', startedAt: new Date() },
        }),
        this.prisma.client.categoryStage.create({
          data: {
            builderStageId: findIdCreateCategoriesStage.id,
          },
        }),
      ]);

      console.log('Creating categories...', createCategoryStage.id);

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
              id: findIdCreateCategoriesStage.id,
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
          this.error(data, findIdCreateCategoriesStage.id);
          throw error;
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      this.builderEmitter.builderEmit(
        data.sessionId,
        { id: findIdCreateCategoriesStage.id, status: 'COMPLETED' },
        'status_updated',
      );

      await this.prisma.client.builderStage.update({
        where: { id: findIdCreateCategoriesStage.id },
        data: { status: 'COMPLETED', finishedAt: new Date() },
      });

      return this.categoryMap;
    } catch (err) {
      console.log(err);
      this.error(data, findIdCreateCategoriesStage.id);
      throw err;
    }
  }

  private async error(data: Builder, id: number) {
    this.builderEmitter.builderEmit(
      data.sessionId,
      { id, status: 'FAILED' },
      'status_updated',
    );

    await this.prisma.client.builderStage.update({
      where: { id },
      data: { status: 'FAILED', finishedAt: new Date() },
    });
  }
}
