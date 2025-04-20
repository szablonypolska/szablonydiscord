import { Injectable, UnauthorizedException } from '@nestjs/common';
import { VerifyPaymentsSessionDto } from '../dto/verify-payments-session.dto';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class VerifyPaymentSessionService {
  constructor(private configService: ConfigService) {}
  private stripe = new Stripe(
    this.configService.get<string>('SECRET_API_KEY_STRIPE'),
  );

  async verify(session: VerifyPaymentsSessionDto) {
    try {
      const verifySession = await this.stripe.checkout.sessions.retrieve(
        session.sessionId,
      );

      if (!verifySession)
        throw new UnauthorizedException('This session in not exists');

      return { orderCode: verifySession.metadata.orderCode };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
