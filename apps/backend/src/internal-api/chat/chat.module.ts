import { Module } from '@nestjs/common';
import { CreateService } from './services/create.service';
import { ChatController } from './chat.controller';
import { SharedModule } from '@repo/shared';

@Module({
  imports: [SharedModule],
  controllers: [ChatController],
  providers: [CreateService],
})
export class ChatModule {}
