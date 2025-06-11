import { Injectable } from '@nestjs/common';
import { GenerateServerSchemaDto } from '../dto/generate-server-schema.dto';
import { PrismaService } from '@repo/shared';
import ShortUniqueId from 'short-unique-id';
import { DiscordAiGeneratorService } from '../services/discord-ai-generator.service';
@Injectable()
export class GenerateServerSchema {
  constructor(
    private prisma: PrismaService,
    private createServer: DiscordAiGeneratorService,
  ) {}

  private uid = new ShortUniqueId({ length: 15 });

  async generate(data: GenerateServerSchemaDto) {
    try {
      const create = await this.prisma.client.generateStatus.create({
        data: { sessionId: this.uid.rnd() },
      });

      this.createServer.generate(data.description, create.sessionId, data.decorationChannel, data.decorationCategory);

      return { id: create.sessionId };
    } catch (err) {
      console.log(err);
    }
  }
}
