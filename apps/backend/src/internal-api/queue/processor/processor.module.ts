import { Module } from '@nestjs/common';
import { TemplateConsumer } from './template.processor';
import { SharedModule } from '@repo/shared';

@Module({
  imports: [SharedModule],
  providers: [TemplateConsumer],
})
export class ProcessorModule {}
