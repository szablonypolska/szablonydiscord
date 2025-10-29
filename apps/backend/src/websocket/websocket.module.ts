import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import { OnlineService } from './services/status.service';
import { CreateMessageService } from 'src/internal-api/chat/ws-services/create-message.service';
import { SharedModule } from '@repo/shared';
import { ConnectionHandler } from './handlers/connection.handler';
import { SessionCreateHandler } from './handlers/session-create.handler';


@Module({
  imports: [SharedModule],
  providers: [
    WebsocketGateway,
    OnlineService,
    CreateMessageService,
    ConnectionHandler,
    SessionCreateHandler,
  ],
  exports: [WebsocketGateway],
})
export class WebsocketModule {}
