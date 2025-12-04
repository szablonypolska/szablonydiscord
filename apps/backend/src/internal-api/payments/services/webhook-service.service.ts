import { Inject, Injectable, RawBodyRequest } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { Request } from 'express';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class WebhookService {
  constructor(
    private configService: ConfigService,
    private eventEmitter: EventEmitter2,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  private stripe = new Stripe(this.configService.get('SECRET_API_KEY_STRIPE'));

  async manageTask(req: RawBodyRequest<Request>) {
    const sig = req.headers['stripe-signature'];
    let event: Stripe.Event;

    event = this.stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      this.configService.get('SECRET_WEBHOOK_STRIPE'),
    );

    if (event.type === 'payment_intent.succeeded') {
      const session = event.data.object as Stripe.PaymentIntent;
      this.eventEmitter.emitAsync(`order_paid`, {
        orderId: session.metadata.orderId,
        paymentIntentId: session.id,
      });
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      this.eventEmitter.emitAsync(
        `pucharsed_successfull_${session.metadata.offer}`,
        { code: session.metadata.orderCode },
      ); //stary status orderCode, teraz jest orderId
    }

    if (event.type === 'refund.created') {
      const refund = event.data.object as Stripe.Refund;

      this.cacheManager.set(
        `refund_${refund.metadata.orderId}`,
        { products: refund.metadata.products, amount: refund.amount },
        48 * 60 * 60 * 1000,
      );
    }

    if (event.type === 'charge.refunded') {
      const charge = event.data.object as Stripe.Charge;

      if (charge.status) {
        this.eventEmitter.emitAsync('refund_updated', {
          orderId: charge.metadata.orderId,
        });
      }
    }
  }
}
