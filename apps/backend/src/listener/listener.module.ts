import { Module } from '@nestjs/common';
import { ListenerService } from './listener.service';
import { SharedModule } from '@repo/shared';

@Module({
  imports: [SharedModule],
  providers: [ListenerService],
})
export class ListenerModule {}
