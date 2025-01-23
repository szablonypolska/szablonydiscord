import { Module } from '@nestjs/common';
import { SharedModule } from '@repo/shared';
import { ApiKeysController } from './api-keys.controller';
import { CreateApiKeysService } from './services/create.service';
import { UpdateService } from './services/update.service';
import { NotificationTestService } from './services/test-notification.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [SharedModule, HttpModule],
  providers: [CreateApiKeysService, UpdateService, NotificationTestService],
  controllers: [ApiKeysController],
})
export class ApiKeysModule {}
