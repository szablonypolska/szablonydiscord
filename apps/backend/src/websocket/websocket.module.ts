import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import { OnlineService } from './services/status.service';
import { CreateMessageService } from 'src/internal-api/chat/ws-services/create-message.service';
import { SharedModule } from '@repo/shared';

@Module({
  imports: [SharedModule],
  providers: [WebsocketGateway, OnlineService, CreateMessageService],
  exports: [WebsocketGateway],
})
export class WebsocketModule {}
