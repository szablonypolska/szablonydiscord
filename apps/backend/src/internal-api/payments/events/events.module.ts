import { Module } from '@nestjs/common';
import { BasicOfferHandler } from './handler/offers/basic-offer.handler';
import { SharedModule } from '@repo/shared';
import { StatusPaidHandler } from './handler/status/status-paid.handler';
import { PremiumOfferHandler } from './handler/offers/premium-offer.handle';
import { MailModule } from 'src/mail/mail.module';
import { WebsocketModule } from 'src/websocket/websocket.module';
import { RefundUpdatedHandler } from './handler/status/refund.handler';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports: [SharedModule, MailModule, WebsocketModule, NotificationsModule],
  providers: [
    BasicOfferHandler,
    StatusPaidHandler,
    PremiumOfferHandler,
    RefundUpdatedHandler,
  ],
})
export class EventsModule {}
