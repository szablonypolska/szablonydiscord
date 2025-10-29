import { Module } from '@nestjs/common';
import { SharedModule } from '@repo/shared';
import { NotificationsService } from './services/notifications.service';
import { WebsocketModule } from 'src/websocket/websocket.module';

@Module({
  imports: [SharedModule, WebsocketModule],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
