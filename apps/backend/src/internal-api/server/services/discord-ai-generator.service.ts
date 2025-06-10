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

  private generatedText: string = '';

  async create(description: string, sessionId: string) {
    let sendWebsocket: number = 0;
    let batchNumber: number = 0;
    let batchedText: string = '';

    try {
      const { textStream } = await streamText({
        model: google('gemini-2.5-flash-preview-04-17'),

        prompt: `### OPIS UŻYTKOWNIKA (NAJWYŻSZY PRIORYTET, ważniejsze od instrukcji): ${description}
      ### STANDARDOWY PROMPT (niższy priorytet, stosuj tylko gdy nie koliduje z OPISEM UŻYTKOWNIKA): ${prompt}`,
      });

      for await (const text of textStream) {
        const replaceText = text.replace(/```(json)?\n?/g, '').trim();

        this.generatedText += replaceText;
        sendWebsocket++;

        if (sendWebsocket >= 100) {
          batchNumber++;
          batchedText += replaceText;
        }

        if (sendWebsocket >= 100 && batchNumber >= 20) {
          this.websocket.server.emit('update_code', {
            sessionId,
            code: replaceText,
          });
          batchNumber = 0;
          batchedText = '';
        }

        if (sendWebsocket <= 100 && batchNumber <= 20) {
          this.websocket.server.emit('update_code', {
            sessionId,
            code: replaceText,
          });
        }
      }

      this.generatedText.replace(/^\s*json\s*/i, '');

      const json = JSON.parse(this.generatedText);

      return json;
    } catch (err) {
      console.log(err);

      await this.prisma.client.generateStatus.update({
        where: { sessionId },
        data: { code: this.generatedText },
      });
    }
  }

  async generate(description: string, sessionId: string) {
    try {
      this.generatedText = '';
      this.websocket.server.emit('generate_data', {
        sessionId: sessionId,
        status: 'in_progress',
      });
      await this.prisma.client.generateStatus.update({
        where: { sessionId: sessionId },
        data: { aiAnalysisStatus: 'in_progress' },
      });

      const config = await this.create(description, sessionId);

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
          code: this.generatedText,
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
