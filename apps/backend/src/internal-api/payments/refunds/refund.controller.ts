import { Controller, Param, Get, Post, Body, HttpCode } from '@nestjs/common';
import { EligibleService } from './services/eligible.service';
import { EligibleDto } from './dto/eligible.dto';
import { ValidationPipe } from '@nestjs/common';
import { RefundService } from './services/refund.service';
import { RefundDto } from './dto/refund.dto';
import { TestService } from './services/test.service';

@Controller('api/payments/refunds')
export class RefundController {
  constructor(
    private readonly eligibleService: EligibleService,
    private readonly refundService: RefundService,
    private readonly testService: TestService,
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

  @Get('/test')
  getTestData() {
    return this.testService.getTestData();
  }
}
