import { Module } from '@nestjs/common';
import { QueueModule } from './queue/queue.module';
import { ListenerModule } from './listener/listener.module';

@Module({
  imports: [QueueModule, ListenerModule],
})
export class AppModule {}
