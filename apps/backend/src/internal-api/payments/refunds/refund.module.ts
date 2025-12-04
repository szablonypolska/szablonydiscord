import { Module } from '@nestjs/common';
import { SharedModule } from '@repo/shared';
import { EligibleService } from './services/eligible.service';
import { RefundController } from './refund.controller';
import { RefundService } from './services/refund.service';
import { ConfigModule } from '@nestjs/config';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { TestService } from './services/test.service';

@Module({
  imports: [SharedModule, NotificationsModule],
  providers: [EligibleService, RefundService, TestService],
  exports: [],
  controllers: [RefundController],
})
export class RefundModule {}
