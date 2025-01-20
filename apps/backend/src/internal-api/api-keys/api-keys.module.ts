import { Module } from '@nestjs/common';
import { SharedModule } from '@repo/shared';
import { ApiKeysController } from './api-keys.controller';
import { CreateApiKeysService } from './services/create.service';

@Module({
  imports: [SharedModule],
  providers: [CreateApiKeysService],
  controllers: [ApiKeysController],
})
export class ApiKeysModule {}
