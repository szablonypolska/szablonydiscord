import { Injectable } from '@nestjs/common';
import { GenerateServerSchemaDto } from '../dto/generate-server-schema.dto';
import { PrismaService } from '@repo/shared';
import ShortUniqueId from 'short-unique-id';
import { DiscordAiGeneratorService } from './analysis/analysis.service';
import { Builder } from '../interfaces/builder.interface';
import { BuilderStageType } from '@prisma/client';

@Injectable()
export class GenerateServerSchema {
  constructor(
    private prisma: PrismaService,
    private createServer: DiscordAiGeneratorService,
  ) {}

  private uid = new ShortUniqueId({ length: 15 });

  async generate(data: GenerateServerSchemaDto) {
    try {
      const types = Object.values(BuilderStageType);
      const create: Builder = await this.prisma.client.builder.create({
        data: {
          sessionId: this.uid.rnd(),
          userId: data.userId,
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
      });

      this.createServer.generate(
        data.description,
        create,
        data.decorationChannel,
        data.decorationCategory,
      );

      return { id: create.sessionId };
    } catch (err) {
      console.log(err);
    }
  }
}
