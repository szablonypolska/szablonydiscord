import { Module } from '@nestjs/common';
import { CreateService } from './services/create.service';
import { ChatController } from './chat.controller';
import { SharedModule } from '@repo/shared';
import { LoadChatService } from './services/load-chat.service';
import { LoadMessageService } from './services/load-message.service';

@Module({
  imports: [SharedModule],
  controllers: [ChatController],
  providers: [CreateService, LoadChatService, LoadMessageService],
})
export class ChatModule {}
