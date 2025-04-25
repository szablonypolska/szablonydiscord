import { Module } from '@nestjs/common';
import { BasicOfferHandler } from './handler/offers/basic-offer.handler';
import { SharedModule } from '@repo/shared';
import { StatusPaidHandler } from './handler/status/status-paid.handler';
import { PremiumOfferHandler } from './handler/offers/premium-offer.handle';

@Module({
  imports: [SharedModule],
  providers: [BasicOfferHandler, StatusPaidHandler, PremiumOfferHandler],
})
export class EventsModule {}
