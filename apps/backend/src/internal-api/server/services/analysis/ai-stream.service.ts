import { Injectable } from '@nestjs/common';
import { PrismaService } from '@repo/shared';
import { prompt } from '../../instructions/ai-prompt.json';
import { BuilderEmitterService } from '../emitter/builder-emitter.service';
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export class AiStreamService {
  constructor(
    private prisma: PrismaService,
    private builderEmitter: BuilderEmitterService,
  ) {}

  async stream(
    description: string,
    sessionId: string,
    decorationChannel: string,
    decorationCategory: string,
    id: number,
  ) {
    let sendWebsocket: number = 0;
    let batchNumber: number = 0;
    let batchedText: string[] = [];
    let generatedText: string[] = [];
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

        generatedText.push(chunk);
        sendWebsocket++;

        if (sendWebsocket >= BATCH_SIZE) {
          batchNumber++;
          batchedText.push(chunk);
        }

        if (sendWebsocket >= BATCH_SIZE && batchNumber >= BATCH_STEP) {
          const payload = { id, code: batchedText.join('') };
          this.builderEmitter.builderEmit(sessionId, payload, 'code_updated');

          batchNumber = 0;
          batchedText.length = 0;
        }

        if (sendWebsocket <= BATCH_SIZE && batchNumber <= BATCH_STEP) {
          const payload = { id, code: chunk };
          this.builderEmitter.builderEmit(sessionId, payload, 'code_updated');
        }
      }

      const json = JSON.parse(
        generatedText.join('').replace(/^\s*json\s*/i, ''),
      );

      return json;
    } catch (err) {
      console.log(err);

      await this.prisma.client.builder.update({
        where: { sessionId },
        data: { code: generatedText.join('') },
      });
    }
  }
}
