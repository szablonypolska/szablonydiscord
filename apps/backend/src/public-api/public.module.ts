import { Module } from '@nestjs/common';
import { PublicController } from './public.controller';
import { TemplatesService } from './services/templates.service';
import { AuthModule } from './guard/auth.module';
import { SharedModule } from '@repo/shared';

@Module({
  imports: [AuthModule, SharedModule],
  controllers: [PublicController],
  providers: [TemplatesService],
})
export class PublicModule {}
