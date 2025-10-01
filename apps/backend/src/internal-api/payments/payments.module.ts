import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { CreatePaymentsService } from './services/create-payments.service';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from '@repo/shared';
import { VerifyPromoCodeService } from './services/verify-promo-code.service';
import { WebhookService } from './services/webhook-service.service';
import { VerifyPaymentSessionService } from './services/verify-payment-session.service';
import { CreatePromoCodeService } from './services/create-promo-code.service';
import { RoleModule } from '../guard/role.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule,
    SharedModule,
    RoleModule,
    EventEmitterModule.forRoot(),
  ],
  controllers: [PaymentsController],
  providers: [
    CreatePaymentsService,
    VerifyPromoCodeService,
    WebhookService,
    VerifyPaymentSessionService,
    CreatePromoCodeService,
  ],
})
export class ModulePayments {}
