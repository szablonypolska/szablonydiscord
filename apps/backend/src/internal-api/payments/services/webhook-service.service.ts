import { Injectable, RawBodyRequest } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { Request } from 'express';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class WebhookService {
  constructor(
    private configService: ConfigService,
    private eventEmitter: EventEmitter2,
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

    if (event.type === 'charge.succeeded') {
      const session = event.data.object as Stripe.Charge;
      this.eventEmitter.emit(`order_paid`, {
        code: session.metadata.orderCode,
      });
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      this.eventEmitter.emit(
        `pucharsed_successfull_${session.metadata.offer}`,
        { code: session.metadata.orderCode },
      );
    }
  }
}
