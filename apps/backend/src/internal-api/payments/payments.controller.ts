import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  RawBodyRequest,
  Query,
  Get,
} from '@nestjs/common';
import { CreatePayments } from './services/create-payments.service';
import { VerifyPromoCodeService } from './services/verify-promo-code.service';
import { VerifyPromoCodeDto } from './dto/verify-promo-code.dto';
import { CreatePaymentsDto } from './dto/create-payments.dto';
import { WebhookService } from './services/webhook-service.service';
import { Request as RequestExpress } from 'express';
import { VerifyPaymentSessionService } from './services/verify-payment-session.service';
import { VerifyPaymentsSessionDto } from './dto/verify-payments-session.dto';

@Controller('api/payments')
export class PaymentsController {
  constructor(
    private readonly servicePayment: CreatePayments,
    private readonly promo: VerifyPromoCodeService,
    private readonly webhook: WebhookService,
    private readonly session: VerifyPaymentSessionService,
  ) {}

  @Post('/create')
  @HttpCode(200)
  createPayments(@Body() create: CreatePaymentsDto) {
    return this.servicePayment.createPayments(create);
  }

  @Post('/verify')
  @HttpCode(200)
  verifyPromoCode(@Body() promoCode: VerifyPromoCodeDto) {
    return this.promo.verifyPromoCode(promoCode);
  }

  @Get('/verify/session')
  @HttpCode(200)
  verify(@Query() sessionId: VerifyPaymentsSessionDto) {
    return this.session.verify(sessionId);
  }

  @Post('/webhook')
  @HttpCode(200)
  manageTask(@Req() req: RawBodyRequest<RequestExpress>) {
    return this.webhook.manageTask(req);
  }
}
