import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { Request } from 'express';

@Injectable()
export class WebhookService {
  constructor(private readonly configService: ConfigService) {}

  private apiKey = this.configService.get<string>('SECRET_API_KEY_STRIPE');
  private webhookSecret = this.configService.get<string>(
    'SECRET_WEBHOOK_STRIPE',
  );
  private client = new Stripe(this.apiKey);

  async manageTask(req: Request) {
    const sig = req.headers['stripe-signature'];

    try {
      const thinEvent = this.client.parseThinEvent(
        req.body,
        sig,
        this.webhookSecret,
      );

      const event = await this.client.v2.core.events.retrieve(thinEvent.id);

      console.log(event.type);
    } catch (err) {
      console.log(err);
    }

    console.log(sig);
  }
}
