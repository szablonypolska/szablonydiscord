import { Module } from '@nestjs/common';
import { TemplateConsumer } from './template.processor';
import { SharedModule } from '@repo/shared';
import { MailModule } from 'src/mail/mail.module';


@Module({
  imports: [SharedModule, MailModule],
  providers: [TemplateConsumer],
})
export class ProcessorModule {}
