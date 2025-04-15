import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class CreatePayments {
  constructor(private configService: ConfigService) {}
  private stripe = new Stripe(
    this.configService.get<string>('SECRET_API_KEY_STRIPE'),
  );

  async createPayments() {
    try {
      const price = await this.stripe.prices.create({
        unit_amount: 200,
        currency: 'pln',
        product: 'prod_S8ABOWqGVSN6MD',
      });

      const createSession = await this.stripe.checkout.sessions.create({
        line_items: [
          {
            price: price.id,
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `https://szablonydiscord.pl?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `https://szablonydiscord.pl/cancel`,
      });

      console.log(createSession);
    } catch (err) {
      console.log(err);
    }
  }
}
