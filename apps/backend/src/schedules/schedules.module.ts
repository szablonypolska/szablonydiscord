import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { FlushRedisToPrisma } from './services/flush.cron.service';
import { SharedModule } from '@repo/shared';
import { WebsocketModule } from 'src/websocket/websocket.module';

@Module({
  imports: [ScheduleModule.forRoot(), SharedModule, WebsocketModule],
  providers: [FlushRedisToPrisma],
})
export class SchedulesModule {}
