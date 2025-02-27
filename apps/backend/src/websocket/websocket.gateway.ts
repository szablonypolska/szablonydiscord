import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';
import { OnlineService } from './services/status.service';

@Injectable()
@WebSocketGateway(3006, { cors: '*' })
export class WebsocketGateway {
  constructor(private readonly onlineService: OnlineService) {}

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

  afterInit() {
    console.log('websocket on port 3006 is initialized');
  }
}
