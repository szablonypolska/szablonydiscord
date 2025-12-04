import { Controller, Post, Body } from '@nestjs/common';
import { ReadService } from './services/read.service';
import { ReadDto } from './dto/read.dto';
import { DeleteService } from './services/delete.service';
import { DeleteDto } from './dto/delete.dto';

@Controller('/api/internal/notifications')
export class NotificationsApiController {
  constructor(
    private readonly readService: ReadService,
    private readonly deleteService: DeleteService,
  ) {}

  @Post('/read')
  async markAsRead(@Body() data: ReadDto) {
    return this.readService.markAsRead(data);
  }

  @Post('/delete')
  async deleteNotification(@Body() data: DeleteDto) {
    return this.deleteService.deleteNotification(data);
  }
}
