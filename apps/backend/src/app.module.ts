import { Module } from '@nestjs/common';
import { QueueModule } from './internal-api/queue/queue.module';
import { ListenerModule } from './internal-api/listener/listener.module';
import { TemplateModule } from './internal-api/templates/templates.module';
import { ConfigModule } from '@nestjs/config';
import { ApiKeysModule } from './internal-api/api-keys/api-keys.module';
import { PublicModule } from './public-api/public.module';
import { RedisOptions } from './common/constants/app-options.constants';
import { CacheModule } from '@nestjs/cache-manager';
import { SchedulesModule } from './schedules/schedules.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.registerAsync(RedisOptions),
    PublicModule,
    SchedulesModule,
    // QueueModule,
    ListenerModule,
    TemplateModule,
    ApiKeysModule,
    NotificationsModule,
  ],
})
export class AppModule {}
