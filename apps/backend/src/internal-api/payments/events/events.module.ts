import { Module } from '@nestjs/common';
import { BasicOfferHandler } from './handler/offers/basic-offer.handler';
import { SharedModule } from '@repo/shared';
import { StatusPaidHandler } from './handler/status/status-paid.handler';

@Module({
  imports: [SharedModule],
  providers: [BasicOfferHandler, StatusPaidHandler],
})
export class EventsModule {}
