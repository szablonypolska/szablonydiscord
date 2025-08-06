import { Module } from '@nestjs/common';
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
import { ServerModule } from './internal-api/server/server.module';
import { TemplateIndexModule } from './internal-api/templates/index/template-index.module';
import { BullModule } from '@nestjs/bullmq';
import { ProcessorModule } from './internal-api/queue/processor/processor.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.registerAsync(RedisOptions),
    EventEmitterModule.forRoot(),
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    EventsModule,
    PublicModule,
    SchedulesModule,
    ChatModule,
    ServerModule,
    ModulePayments,
    TemplateModule,
    ApiKeysModule,
    NotificationsModule,
    MailModule,
    TemplateIndexModule,
    ProcessorModule,
  ],
})
export class AppModule {}
