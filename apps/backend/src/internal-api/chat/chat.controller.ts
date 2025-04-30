import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateService } from './services/create.service';
import { CreateDto } from './dto/create.dto';

@Controller('/api/internal/chat')
export class ChatController {
  constructor(private create: CreateService) {}

  @Post('/create')
  @HttpCode(201)
  async createChat(@Body() data: CreateDto) {
    return await this.create.createChat(data);
  }
}
