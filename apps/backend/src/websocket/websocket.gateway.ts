import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
@WebSocketGateway(3006, { cors: '*' })
export class WebsocketGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('info')
  handleMessage(client: any, payload: any): void {
    console.log('Otrzymano zapytanie', payload);
  }

  afterInit() {
    console.log('websocket on port 3006 is initialized');
  }
}
