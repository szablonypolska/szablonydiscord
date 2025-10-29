import { Injectable } from '@nestjs/common';
import { PrismaService } from '@repo/shared';
import { DiscordChooseToken } from '../authentication.service';
import { Builder } from '../../interfaces/builder.interface';
import { BuilderEmitterService } from '../emitter/builder-emitter.service';
import { AiStreamService } from './ai-stream.service';
import { BuilderCode } from '../../interfaces/builder-code.interface';
import { AnalysisResultSaveAndEmitService } from './save.service';

@Injectable()
export class DiscordAiGeneratorService {
  constructor(
    private stream: AiStreamService,
    private prisma: PrismaService,
    private discordChooseToken: DiscordChooseToken,
    private builderEmitter: BuilderEmitterService,
    private analysisResultSaveAndEmitService: AnalysisResultSaveAndEmitService,
  ) {}

  async generate(
    description: string,
    data: Builder,
    decorationChannel: string,
    decorationCategory: string,
  ) {
    let findIdAIAnalysis: { id: number } = { id: 0 };
    let config: BuilderCode;

    try {
      findIdAIAnalysis = data.builderProcess.stages.find(
        (stage) => stage.type === 'ANALYSIS',
      );

      this.builderEmitter.inProgressEmit(data.sessionId, findIdAIAnalysis.id);

      await this.prisma.client.builderStage.update({
        where: { id: findIdAIAnalysis.id },
        data: { status: 'IN_PROGRESS', startedAt: new Date() },
      });

      config = await this.stream.stream(
        description,
        data,
        decorationChannel,
        decorationCategory,
        findIdAIAnalysis.id,
      );

      this.builderEmitter.completeEmit(data.sessionId, findIdAIAnalysis.id);

      await this.analysisResultSaveAndEmitService.saveAndEmitAnalysisResult(
        data,
        config,
        findIdAIAnalysis.id,
      );

      this.discordChooseToken.authentication(config, data);
    } catch (err) {
      console.log(err);

      this.builderEmitter.failedEmit(data.sessionId, findIdAIAnalysis.id);

      await this.prisma.client.builderStage.update({
        where: { id: findIdAIAnalysis.id },
        data: {
          status: 'FAILED',
          finishedAt: new Date(),
          code: JSON.stringify(config),
        },
      });
    }
  }
}
