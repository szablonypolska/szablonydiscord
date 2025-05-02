import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateService } from './services/create.service';
import { CreateDto } from './dto/create.dto';
import { LoadChatService } from './services/load-chat.service';
import { LoadChatDto } from './dto/load-chat.dto';
import { LoadMessageDto } from './dto/load-message.dto';
import { LoadMessageService } from './services/load-message.service';

@Controller('/api/internal/chat')
export class ChatController {
  constructor(
    private create: CreateService,
    private load: LoadChatService,
    private loadData: LoadMessageService,
  ) {}

  @Post('/create')
  @HttpCode(201)
  async createChat(@Body() data: CreateDto) {
    return await this.create.createChat(data);
  }

  @Post('/load')
  @HttpCode(201)
  async loadChat(@Body() data: LoadChatDto) {
    return await this.load.loadChat(data);
  }

  @Post('/load/message')
  @HttpCode(201)
  async loadMessage(@Body() data: LoadMessageDto) {
    return await this.loadData.loadMessage(data);
  }
}
