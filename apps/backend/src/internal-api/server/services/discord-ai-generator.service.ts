import { Injectable } from '@nestjs/common';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';
import { PrismaService } from '@repo/shared';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { DiscordServerCreatorService } from './discord-server-creator.service';
import { prompt } from '../instructions/ai-prompt.json';

@Injectable()
export class DiscordAiGeneratorService {
  constructor(
    private websocket: WebsocketGateway,
    private prisma: PrismaService,
    private createServer: DiscordServerCreatorService,
  ) {}

  async generate(description: string, token: string, id: string) {
    try {
      this.websocket.server.emit('generate_data', {
        sessionId: id,
        status: 'in_progress',
      });
      await this.prisma.client.generateStatus.update({
        where: { sessionId: id },
        data: { aiAnalysisStatus: 'in_progress' },
      });
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

      const promptGenerate = `Opis: ${description}, ${prompt}`;

      const result = await model.generateContent(promptGenerate);
      const text = result.response
        .text()
        .replace(/```(json)?\n?/g, '')
        .trim();

      const config = JSON.parse(text);

      this.createServer.createServer(token, config, id);
    } catch (err) {
      console.log(err);
    }
  }
}
