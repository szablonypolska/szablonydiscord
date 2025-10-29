import { Injectable } from '@nestjs/common';
import { PrismaService } from '@repo/shared';
import { Guild, CategoryChannel, Role } from 'discord.js-selfbot-v13';
import { Builder } from '../../interfaces/builder.interface';
import { BuilderEmitterService } from '../emitter/builder-emitter.service';
import { Categories } from '../../interfaces/builder-code.interface';
import { CreateCategoriesService } from './create-category.service';

@Injectable()
export class DiscordCreateCategoryService {
  constructor(
    private prisma: PrismaService,
    private createCategoriesService: CreateCategoriesService,
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

      this.builderEmitter.inProgressEmit(
        data.sessionId,
        findIdCreateCategoriesStage.id,
      );

      try {
        await this.createCategoriesService.createCategories(
          findIdCreateCategoriesStage.id,
          guild,
          categories,
          roleMap,
          data,
        );
      } catch (err) {
        console.log(err);
        this.error(data, findIdCreateCategoriesStage.id);
        throw err;
      }

      this.builderEmitter.completeEmit(
        data.sessionId,
        findIdCreateCategoriesStage.id,
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
    this.builderEmitter.failedEmit(data.sessionId, id);

    await this.prisma.client.builderStage.update({
      where: { id },
      data: { status: 'FAILED', finishedAt: new Date() },
    });
  }
}
