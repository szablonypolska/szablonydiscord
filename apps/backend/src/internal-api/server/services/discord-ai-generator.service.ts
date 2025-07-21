import { Injectable } from '@nestjs/common';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';
import { PrismaService } from '@repo/shared';
import { prompt } from '../instructions/ai-prompt.json';
import { DiscordChooseToken } from './authentication.service';
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

@Injectable()
export class DiscordAiGeneratorService {
  constructor(
    private websocket: WebsocketGateway,
    private prisma: PrismaService,
    private discordChooseToken: DiscordChooseToken,
  ) {}

  private generatedText: string[] = [];

  async create(
    description: string,
    sessionId: string,
    decorationChannel: string,
    decorationCategory: string,
  ) {
    let sendWebsocket: number = 0;
    let batchNumber: number = 0;
    let batchedText: string[] = [];
    const BATCH_SIZE = 100;
    const BATCH_STEP = 20;

    try {
      const { textStream } = await streamText({
        model: google('gemini-2.5-flash'),

        prompt: `### Wybrana przedziałka dla kanałów: ${decorationChannel}, dla kategorii ${decorationCategory} ### OPIS UŻYTKOWNIKA (NAJWYŻSZY PRIORYTET, ważniejsze od instrukcji): ${description}
      ### STANDARDOWY PROMPT (niższy priorytet, stosuj tylko gdy nie koliduje z OPISEM UŻYTKOWNIKA): ${prompt}`,
      });

      for await (const text of textStream) {
        const chunk = text.replace(/```(json)?\n?/g, '').trim();

        this.generatedText.push(chunk);
        sendWebsocket++;

        if (sendWebsocket >= BATCH_SIZE) {
          batchNumber++;
          batchedText.push(chunk);
        }

        if (sendWebsocket >= BATCH_SIZE && batchNumber >= BATCH_STEP) {
          this.websocket.server.emit('update_code', {
            sessionId,
            code: batchedText.join(''),
          });
          batchNumber = 0;
          batchedText.length = 0;
        }

        if (sendWebsocket <= BATCH_SIZE && batchNumber <= BATCH_STEP) {
          this.websocket.server.emit('update_code', {
            sessionId,
            code: chunk,
          });
        }
      }

      const json = JSON.parse(
        this.generatedText.join('').replace(/^\s*json\s*/i, ''),
      );

      return json;
    } catch (err) {
      console.log(err);

      await this.prisma.client.generateStatus.update({
        where: { sessionId },
        data: { code: this.generatedText.join('') },
      });
    }
  }

  async generate(
    description: string,
    sessionId: string,
    decorationChannel: string,
    decorationCategory: string,
  ) {
    try {
      this.generatedText.length = 0;
      this.websocket.server.emit('generate_data', {
        sessionId: sessionId,
        status: 'in_progress',
      });
      await this.prisma.client.generateStatus.update({
        where: { sessionId: sessionId },
        data: { aiAnalysisStatus: 'in_progress' },
      });

      const config = await this.create(
        description,
        sessionId,
        decorationChannel,
        decorationCategory,
      );

      this.websocket.server.emit('generate_data', {
        sessionId,
        status: 'done',
        rolesNumber: config.roles.length,
        categoryNumber: config.categories.length,
        channelNumber: config.channels.length,
        title: config.details.title,
        description: config.details.description,
        code: this.generatedText,
      });

      await this.prisma.client.generateStatus.update({
        where: { sessionId },
        data: {
          aiAnalysisStatus: 'done',
          rolesNumber: config.roles.length,
          categoryNumber: config.categories.length,
          channelNumber: config.channels.length,
          title: config.details.title,
          description: config.details.description,
          rules: config.details.rules,
          tariff: config.details.tariff,
          privacyPolicy: config.details.privacyPolicy,
          faq: config.details.faq,
          code: this.generatedText.join(''),
        },
      });

      this.discordChooseToken.authentication(config, sessionId);
    } catch (err) {
      console.log(err);

      this.websocket.server.emit('generate_data', {
        sessionId,
        status: 'error',
        aiAnalysisError: true,
      });
      await this.prisma.client.generateStatus.update({
        where: { sessionId },
        data: { aiAnalysisError: true },
      });
    }
  }
}
