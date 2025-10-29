import { Injectable } from '@nestjs/common';
import { PrismaService } from '@repo/shared';
import { Builder } from '../../interfaces/builder.interface';
import { BuilderCode } from '../../interfaces/builder-code.interface';
import { BuilderEmitterService } from '../emitter/builder-emitter.service';

@Injectable()
export class AnalysisResultSaveAndEmitService {
  constructor(
    private prisma: PrismaService,
    private builderEmitter: BuilderEmitterService,
  ) {}

  async saveAndEmitAnalysisResult(
    data: Builder,
    config: BuilderCode,
    id: number,
  ) {
    try {
      this.builderEmitter.builderEmit(
        data.sessionId,
        {
          id,
          title: config.details.title,
          description: config.details.description,
          code: config,
          metrics: {
            totalCategories: config.categories.length,
            totalChannels: config.channels.length,
            totalRoles: config.roles.length,
          },
          materials: {
            rules: config.details.rules,
            tariff: config.details.tariff,
            privacyPolicy: config.details.privacyPolicy,
            faq: config.details.faq,
          },
        },
        'analysis_completed',
      );

      await this.prisma.client.$transaction([
        this.prisma.client.builder.update({
          where: { sessionId: data.sessionId },
          data: {
            title: config.details.title,
            description: config.details.description,
            materials: {
              create: {
                rules: config.details.rules,
                tariff: config.details.tariff,
                privacyPolicy: config.details.privacyPolicy,
                faq: config.details.faq,
              },
            },
          },
        }),
        this.prisma.client.builderStage.update({
          where: { id },
          data: {
            status: 'COMPLETED',
            finishedAt: new Date(),
            code: config,
          },
        }),
        this.prisma.client.builderMetrics.create({
          data: {
            sessionId: data.sessionId,
            totalCategories: config.categories.length,
            totalChannels: config.channels.length,
            totalRoles: config.roles.length,
          },
        }),
      ]);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
