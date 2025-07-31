import { Module } from '@nestjs/common';
import { ProviderIndex } from './provider.store';
import { UpdateIndexService } from './update-index.service';
import { SharedModule } from '@repo/shared';

@Module({
  imports: [SharedModule],
  providers: [ProviderIndex, UpdateIndexService],
  exports: [ProviderIndex],
})
export class TemplateIndexModule {}
