import { Module } from '@nestjs/common';
import { QueueModule } from './internal-api/queue/queue.module';
import { TemplateModule } from './internal-api/templates/templates.module';
import { ConfigModule } from '@nestjs/config';
import { ApiKeysModule } from './internal-api/api-keys/api-keys.module';
import { PublicModule } from './public-api/public.module';
import { RedisOptions } from './common/constants/app-options.constants';
import { CacheModule } from '@nestjs/cache-manager';
import { SchedulesModule } from './schedules/schedules.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ModulePayments } from './internal-api/payments/payments.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventsModule } from './internal-api/payments/events/events.module';
import { ChatModule } from './internal-api/chat/chat.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.registerAsync(RedisOptions),
    EventEmitterModule.forRoot(),
    EventsModule,
    PublicModule,
    SchedulesModule,
    ChatModule,
    ModulePayments,
    // QueueModule,
    TemplateModule,
    ApiKeysModule,
    NotificationsModule,
    MailModule,
  ],
})
export class AppModule {}
