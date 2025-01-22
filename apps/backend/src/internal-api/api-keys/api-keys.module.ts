import { Module } from '@nestjs/common';
import { SharedModule } from '@repo/shared';
import { ApiKeysController } from './api-keys.controller';
import { CreateApiKeysService } from './services/create.service';
import { UpdateService } from './services/update.service';

@Module({
  imports: [SharedModule],
  providers: [CreateApiKeysService, UpdateService],
  controllers: [ApiKeysController],
})
export class ApiKeysModule {}
