import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import { OnlineService } from './services/status.service';

@Module({
  providers: [WebsocketGateway, OnlineService],
  exports: [WebsocketGateway],
})
export class WebsocketModule {}
