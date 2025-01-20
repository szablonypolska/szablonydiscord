import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '@repo/shared';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';

@Injectable()
export class ListenerService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly websocket: WebsocketGateway,
  ) {}

  async onModuleInit(): Promise<void> {
    this.startListening();
  }

  private async startListening(): Promise<void> {
    try {
      const stream = await this.prisma.client.templates.stream({
        name: 'templates',
      });

      for await (const event of stream) {
        console.log(event);
        if (event.action == 'create') {
          this.websocket.server.emit('info', {
            action: 'create',
            templateId: event.created.templateId,
            dateCreate: event.created.dateCreate,
          });
        }

        if (event.action == 'delete') {
          this.websocket.server.emit('info', {
            action: 'delete',
          });
        }
      }
    } catch (error) {
      console.error('error', error);
    }
  }
}
