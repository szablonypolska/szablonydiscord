import { Injectable } from '@nestjs/common';
import { PrismaService } from '@repo/shared';
import { prompt } from '../../instructions/ai-prompt.json';
import { promptEdit } from '../../instructions/ai-prompt-edit.json';
import { BuilderEmitterService } from '../emitter/builder-emitter.service';
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { Builder } from '../../interfaces/builder.interface';
import { Template } from 'src/interfaces/template.interface';

@Injectable()
export class AiStreamService {
  constructor(
    private prisma: PrismaService,
    private builderEmitter: BuilderEmitterService,
  ) {}

  async stream(
    description: string,
    data: Builder,
    decorationChannel: string,
    decorationCategory: string,
    id: number,
  ) {
    let sendWebsocket: number = 0;
    let batchNumber: number = 0;
    let batchedText: string[] = [];
    let generatedText: string[] = [];
    let templateCode: string = '';
    const BATCH_SIZE = 100;
    const BATCH_STEP = 20;

    try {
      if (data.sourceTemplate) {
        const templates: Template =
          await this.prisma.client.templates.findUnique({
            where: { slugUrl: data.sourceTemplate },
          });
        templateCode = templates.code || '';
      }

      const selectPrompt = data.sourceTemplate
        ? `Edytuj istniejący szablon zgodnie z poniższym opisem użytkownika. Opis użytkownika (NAJWYŻSZY PIORYTET): ${description}, kod szablonu do edycji: ${templateCode} 
      Standardowy prompt (niższy priorytet, stosuj tylko gdy nie koliduje z OPISEM UŻYTKOWNIKA): ${promptEdit}`
        : `### Wybrana przedziałka dla kanałów: ${decorationChannel}, dla kategorii ${decorationCategory} ### OPIS UŻYTKOWNIKA (NAJWYŻSZY PRIORYTET, ważniejsze od instrukcji): ${description}
      ### STANDARDOWY PROMPT (niższy priorytet, stosuj tylko gdy nie koliduje z OPISEM UŻYTKOWNIKA): ${prompt}`;

      const { textStream } = streamText({
        model: google('gemini-2.5-flash'),

        prompt: selectPrompt,
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
          this.builderEmitter.builderEmit(
            data.sessionId,
            payload,
            'code_updated',
          );

          batchNumber = 0;
          batchedText.length = 0;
        }

        if (sendWebsocket <= BATCH_SIZE && batchNumber <= BATCH_STEP) {
          const payload = { id, code: chunk };
          this.builderEmitter.builderEmit(
            data.sessionId,
            payload,
            'code_updated',
          );
        }
      }

      const json = JSON.parse(
        generatedText.join('').replace(/^\s*json\s*/i, ''),
      );

      return json;
    } catch (err) {
      console.log(err);

      await this.prisma.client.builder.update({
        where: { sessionId: data.sessionId },
        data: { code: JSON.stringify(generatedText.join('')) },
      });
      throw err;
    }
  }
}
