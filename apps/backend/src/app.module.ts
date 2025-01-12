import { Module } from '@nestjs/common';
import { QueueModule } from './queue/queue.module';
import { ListenerModule } from './listener/listener.module';
import { TemplateModule } from './templates/templates.module';

@Module({
  imports: [QueueModule, ListenerModule, TemplateModule],
})
export class AppModule {}
