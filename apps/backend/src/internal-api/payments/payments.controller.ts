import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreatePayments } from './services/create-payments.service';
import { VerifyPromoCodeService } from './services/verify-promo-code.service';
import { VerifyPromoCodeDto } from './dto/verify-promo-code.dto';
import { CreatePaymentsDto } from './dto/create-payments.dto';

@Controller('api/payments')
export class PaymentsController {
  constructor(
    private readonly servicePayment: CreatePayments,
    private readonly promo: VerifyPromoCodeService,
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
}
