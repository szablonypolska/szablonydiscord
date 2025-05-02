import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';
import { OnlineService } from './services/status.service';
import { CreateMessageService } from 'src/internal-api/chat/ws-services/create-message.service';
import { TempMessage } from 'src/interfaces/temp-message.interace';

@Injectable()
@WebSocketGateway(3006, { cors: '*' })
export class WebsocketGateway {
  constructor(
    private readonly onlineService: OnlineService,
    private readonly create: CreateMessageService,
  ) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('online')
  changeStatusOnline(client: any, payload: any): void {
    this.onlineService.updateOnline(payload.userId);
  }

  @SubscribeMessage('offline')
  changeStatusOffline(client: any, payload: any): void {
    this.onlineService.updateOffline(payload.userId);
  }

  @SubscribeMessage('message:create')
  createMessage(client: any, payload: TempMessage): void {
    this.create.createMessage(payload);
  }

  afterInit() {
    console.log('websocket on port 3006 is initialized');
  }
}
