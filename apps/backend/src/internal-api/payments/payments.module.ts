import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { CreatePayments } from './services/create-payments.service';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from '@repo/shared';
import { VerifyPromoCodeService } from './services/verify-promo-code.service';
import { WebhookService } from './services/webhook-service.service';

@Module({
  imports: [ConfigModule, SharedModule],
  controllers: [PaymentsController],
  providers: [CreatePayments, VerifyPromoCodeService, WebhookService],
})
export class ModulePayments {}
