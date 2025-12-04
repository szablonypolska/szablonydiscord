import { BadRequestException, Injectable } from '@nestjs/common';
import { GenerateServerSchemaDto } from '../dto/generate-server-schema.dto';
import { PrismaService } from '@repo/shared';
import ShortUniqueId from 'short-unique-id';
import { DiscordAiGeneratorService } from './analysis/analysis.service';
import { BuilderStageType } from '@prisma/client';
import { User } from '../../../interfaces/user.interface';

@Injectable()
export class GenerateServerSchema {
  constructor(
    private prisma: PrismaService,
    private createServer: DiscordAiGeneratorService,
  ) {}

  private uid = new ShortUniqueId({ length: 15 });

  async generate(data: GenerateServerSchemaDto) {
    try {
      const user: User | null = await this.prisma.client.user.findUnique({
        where: { userId: data.userId },
        include: { limits: true },
      });

      if (!user)
        throw new BadRequestException({ ok: false, message: 'User not found' });

      if (
        user.limits.builderAiUsage >= user.limits.builderAiLimit ||
        user.limits.builderAiUsageMonthly >= user.limits.builderAiLimitMonthly
      ) {
        throw new BadRequestException({
          ok: false,
          message: 'AI Builder limit reached',
        });
      }

      const types = Object.values(BuilderStageType);
      const [, create] = await this.prisma.client.$transaction([
        this.prisma.client.limits.update({
          where: { userId: user.userId },
          data: {
            builderAiUsage: { increment: 1 },
            builderAiUsageMonthly: { increment: 1 },
          },
        }),
        this.prisma.client.builder.create({
          data: {
            sessionId: this.uid.rnd(),
            userId: data.userId,
            sourceTemplate: data.sourceTemplate || null,
            builderProcess: {
              create: {
                stages: {
                  create: types.map((type) => ({ type })),
                },
              },
            },
          },
          include: {
            builderProcess: {
              include: { stages: true },
            },
          },
        }),
      ]);

      this.createServer.generate(
        data.description,
        create,
        data.decorationChannel,
        data.decorationCategory,
      );

      return { id: create.sessionId };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
