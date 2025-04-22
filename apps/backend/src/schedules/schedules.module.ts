import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { FlushRedisToPrisma } from './services/flush.cron.service';
import { SharedModule } from '@repo/shared';
import { WebsocketModule } from 'src/websocket/websocket.module';
import { RefreshTokenService } from './services/refresh-token.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    SharedModule,
    ConfigModule,
    WebsocketModule,
  ],
  providers: [FlushRedisToPrisma, RefreshTokenService],
})
export class SchedulesModule {}
