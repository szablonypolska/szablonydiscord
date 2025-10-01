import { Controller, Param, Get, Post, Body, HttpCode } from '@nestjs/common';
import { EligibleService } from './services/eligible.service';
import { EligibleDto } from './dto/eligible.dto';
import { ValidationPipe } from '@nestjs/common';
import { RefundService } from './services/refund.service';
import { RefundDto } from './dto/refund.dto';

@Controller('api/payments/refunds')
export class RefundController {
  constructor(
    private readonly eligibleService: EligibleService,
    private readonly refundService: RefundService,
  ) {}

  @Get('/:orderId/eligible')
  @HttpCode(200)
  getEligibleRefunds(
    @Param(new ValidationPipe({ transform: true })) params: EligibleDto,
  ) {
    return this.eligibleService.getEligibleRefunds(params);
  }

  @Post('/process')
  @HttpCode(200)
  processRefund(@Body() data: RefundDto) {
    return this.refundService.processRefund(data);
  }
}
