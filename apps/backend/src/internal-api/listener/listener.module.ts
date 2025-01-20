import { Module } from '@nestjs/common';
import { ListenerService } from './listener.service';
import { SharedModule } from '@repo/shared';
import { WebsocketModule } from 'src/websocket/websocket.module';

@Module({
  imports: [SharedModule, WebsocketModule],
  providers: [ListenerService],
})
export class ListenerModule {}
