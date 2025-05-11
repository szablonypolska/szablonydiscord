import { Module } from '@nestjs/common';
import { BasicOfferHandler } from './handler/offers/basic-offer.handler';
import { SharedModule } from '@repo/shared';
import { StatusPaidHandler } from './handler/status/status-paid.handler';
import { PremiumOfferHandler } from './handler/offers/premium-offer.handle';
import { MailModule } from 'src/mail/mail.module';
import { WebsocketModule } from 'src/websocket/websocket.module';


@Module({
  imports: [SharedModule, MailModule, WebsocketModule],
  providers: [BasicOfferHandler, StatusPaidHandler, PremiumOfferHandler],
})
export class EventsModule {}
