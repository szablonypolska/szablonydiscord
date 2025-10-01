import { Module } from '@nestjs/common';
import { SharedModule } from '@repo/shared';
import { EligibleService } from './services/eligible.service';
import { RefundController } from './refund.controller';
import { RefundService } from './services/refund.service';


@Module({
  imports: [SharedModule],
  providers: [EligibleService, RefundService],
  exports: [],
  controllers: [RefundController],
})
export class RefundModule {}
