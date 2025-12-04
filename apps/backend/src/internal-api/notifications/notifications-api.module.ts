import { Module } from '@nestjs/common';
import { NotificationsApiController } from './notifications-api.controller';
import { ReadService } from './services/read.service';
import { SharedModule } from '@repo/shared';
import { DeleteService } from './services/delete.service';


@Module({
  imports: [SharedModule],
  controllers: [NotificationsApiController],
  providers: [ReadService, DeleteService],
})
export class NotificationsApiModule {}
