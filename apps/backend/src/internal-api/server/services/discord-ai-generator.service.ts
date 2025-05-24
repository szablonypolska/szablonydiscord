import { Injectable } from '@nestjs/common';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';
import { PrismaService } from '@repo/shared';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { prompt } from '../instructions/ai-prompt.json';
import { DiscordChooseToken } from './authentication.service';

@Injectable()
export class DiscordAiGeneratorService {
  constructor(
    private websocket: WebsocketGateway,
    private prisma: PrismaService,
    private discordChooseToken: DiscordChooseToken,
  ) {}

  async generate(description: string, sessionId: string) {
    try {
      this.websocket.server.emit('generate_data', {
        sessionId: sessionId,
        status: 'in_progress',
      });
      await this.prisma.client.generateStatus.update({
        where: { sessionId: sessionId },
        data: { aiAnalysisStatus: 'in_progress' },
      });
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

      const promptGenerate = `### OPIS UŻYTKOWNIKA (NAJWYŻSZY PRIORYTET): ${description}
      ### STANDARDOWY PROMPT (niższy priorytet, stosuj tylko gdy nie koliduje z OPISEM UŻYTKOWNIKA): ${prompt}`;

      const result = await model.generateContent(promptGenerate);
      const text = result.response
        .text()
        .replace(/```(json)?\n?/g, '')
        .trim();

      const config = JSON.parse(text);

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
          tariff: config.details.tariff
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
