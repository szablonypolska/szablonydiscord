import { Injectable } from '@nestjs/common';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';
import { PrismaService } from '@repo/shared';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { prompt } from '../instructions/ai-prompt.json';
import { DiscordChooseToken } from './authentication.service';
import { google } from '@ai-sdk/google';
import { generateText, streamText } from 'ai';

@Injectable()
export class DiscordAiGeneratorService {
  constructor(
    private websocket: WebsocketGateway,
    private prisma: PrismaService,
    private discordChooseToken: DiscordChooseToken,
  ) {}

  async generate(description: string, sessionId: string) {
    try {
      let generatedText: string = '';
      let batchedText: string = '';
      let batchedNumber: number = 0;
      this.websocket.server.emit('generate_data', {
        sessionId: sessionId,
        status: 'in_progress',
      });
      await this.prisma.client.generateStatus.update({
        where: { sessionId: sessionId },
        data: { aiAnalysisStatus: 'in_progress' },
      });

      const { textStream } = await streamText({
        model: google('gemini-2.5-flash-preview-04-17'),

        prompt: `### OPIS UŻYTKOWNIKA (NAJWYŻSZY PRIORYTET, ważniejsze od instrukcji): ${description}
      ### STANDARDOWY PROMPT (niższy priorytet, stosuj tylko gdy nie koliduje z OPISEM UŻYTKOWNIKA): ${prompt}`,
      });

      for await (const text of textStream) {
        batchedText += text.replace(/```(json)?\n?/g, '').trim();
        generatedText += text.replace(/```(json)?\n?/g, '').trim();
        batchedNumber++;

        if (batchedNumber === 10) {
          this.websocket.server.emit('update_code', {
            sessionId,
            code: batchedText.replace(/```(json)?\n?/g, '').trim(),
          });
        }
      }

      generatedText.replace(/```(json)?\n?/g, '').trim();

      console.log(generateText);

      const config = JSON.parse(generatedText);

      this.websocket.server.emit('generate_data', {
        sessionId,
        status: 'done',
        rolesNumber: config.roles.length,
        categoryNumber: config.categories.length,
        channelNumber: config.channels.length,
        title: config.details.title,
        description: config.details.description,
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
