import { BadGatewayException, Injectable } from '@nestjs/common';
import { PrismaService } from '@repo/shared';
import { PublishDto } from '../dto/publish.dto';
import ShortUniqueId from 'short-unique-id';
import { slugify } from 'src/common/utils/slugify';
import { Builder } from '../interfaces/builder.interface';
import { TemplateCategory } from '../../../interfaces/template.interface';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import {
  BuilderStage,
  BuilderStageType,
} from '../interfaces/builder.interface';

@Injectable()
export class PublishTemplate {
  constructor(
    private prisma: PrismaService,
    private httpService: HttpService,
  ) {}
  private uid = new ShortUniqueId({ length: 15 });

  async publishTemplate(data: PublishDto) {
    try {
      const builderData: Builder | null =
        await this.prisma.client.builder.findUnique({
          where: { sessionId: data.id },
          include: {
            builderProcess: {
              include: { stages: true },
            },
          },
        });

      if (!builderData)
        throw new BadGatewayException({
          ok: false,
          message: 'Builder not found',
        });

      if (!builderData.templateCode)
        throw new BadGatewayException({
          ok: false,
          message: 'This template is still being created',
        });

      if (builderData.templateUrl)
        return new BadGatewayException({
          ok: false,
          message: 'This template is already added',
        });

      await this.checkIsTemplateValid(builderData.templateCode);
      const stageCode: BuilderStage = builderData.builderProcess.stages.find(
        (stage) => stage.type === BuilderStageType.ANALYSIS,
      );
      const code = JSON.parse(stageCode.code);

      const slugUrl = await slugify(builderData.title);

      const create = await this.prisma.client.templates.create({
        data: {
          id: this.uid.rnd(),
          link: `https://discord.new/${builderData.templateCode}`,
          slugUrl,
          title: builderData.title,
          description: builderData.description || '',
          categories: TemplateCategory.AI,
          code: builderData.templateCode,
          authorId: builderData.userId,
          channelsCount: code.channels.length,
          rolesCount: code.roles.length,
          categoriesCount: code.categories.length,
        },
      });

      await this.prisma.client.builder.update({
        where: { sessionId: data.id },
        data: { templateUrl: create.slugUrl },
      });

      return {
        message: 'Templates is created',
        slugUrl: create.slugUrl,
        ok: true,
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  private async checkIsTemplateValid(id: string): Promise<void> {
    try {
      const data = await lastValueFrom(
        this.httpService.get(
          `https://discord.com/api/v9/guilds/templates/${id}`,
        ),
      );

      if (!data) {
        throw new BadGatewayException({
          ok: false,
          message: 'Template is not valid',
        });
      }
      return;
    } catch (err) {
      console.log(err);
      throw new BadGatewayException({
        ok: false,
        message: 'Template is not valid',
      });
    }
  }
}
