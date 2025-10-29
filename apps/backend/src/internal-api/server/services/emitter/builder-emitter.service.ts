import { Injectable } from '@nestjs/common';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';
import { BuilderWebsocketType } from '../../interfaces/builder.interface';

@Injectable()
export class BuilderEmitterService {
  constructor(private websocket: WebsocketGateway) {}

  builderEmit(
    sessionId: string,
    payload: any,
    type: BuilderWebsocketType,
  ): void {
    try {
      this.websocket.server
        .to(`sessionId:${sessionId}`)
        .emit('builder_update', type, payload);
    } catch (error) {
      console.error('Error emitting builder event:', error);
    }
  }

  inProgressEmit(sessionId: string, id: number): void {
    this.builderEmit(
      sessionId,
      { id, status: 'IN_PROGRESS' },
      'status_updated',
    );
  }

  completeEmit(sessionId: string, id: number): void {
    this.builderEmit(sessionId, { id, status: 'COMPLETED' }, 'status_updated');
  }

  failedEmit(sessionId: string, id: number): void {
    this.builderEmit(sessionId, { id, status: 'FAILED' }, 'status_updated');
  }
}
