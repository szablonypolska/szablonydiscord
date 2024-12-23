import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
@WebSocketGateway(3005, { cors: '*' })
export class WebsocketGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): void {
    console.log('Otrzymano zapytanie', payload);
    client.emit('message', { karol: 'huj' });
  }

  afterInit() {
    console.log('zainicjanizlowano');
  }
}
