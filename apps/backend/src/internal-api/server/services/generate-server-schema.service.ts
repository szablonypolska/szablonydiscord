import { Injectable } from '@nestjs/common';

import { DiscordServerCreatorService } from './create-server.service';
import { GenerateServerSchemaDto } from '../dto/generate-server-schema.dto';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';
import { PrismaService } from '@repo/shared';
import ShortUniqueId from 'short-unique-id';

@Injectable()
export class GenerateServerSchema {
  constructor(
    private discordServer: DiscordServerCreatorService,
    private websocket: WebsocketGateway,
    private prisma: PrismaService,
  ) {}

  private uid = new ShortUniqueId({ length: 15 });

  async generate(data: GenerateServerSchemaDto) {
    try {
      const create = await this.prisma.client.generateStatus.create({
        data: { sessionId: this.uid.rnd() },
      });

      this.discordServer.generate(
        data.description,
        data.token,
        create.sessionId,
      );

      return { id: create.sessionId };
    } catch (err) {
      console.log(err);
    }
  }
}
