import { Module } from '@nestjs/common';
import { TemplateConsumer } from './template.processor';
import { SharedModule } from '@repo/shared';
import { MailModule } from 'src/mail/mail.module';
import { NotificationsModule } from 'src/notifications/notifications.module';


@Module({
  imports: [SharedModule, MailModule, NotificationsModule],
  providers: [TemplateConsumer],
})
export class ProcessorModule {}
