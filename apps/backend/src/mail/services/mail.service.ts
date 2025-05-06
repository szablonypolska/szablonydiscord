import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { MailData } from '../interfaces/mail-data.interface';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly mailerService: MailerService) {}

  async sendMail(mailData: MailData): Promise<boolean> {
    try {
      await this.mailerService.sendMail({
        to: mailData.to,
        subject: mailData.subject,
        template: mailData.template,
        context: mailData.context,
        html: mailData.html,
        text: mailData.text,
        attachments: mailData.attachments,
      });
      this.logger.log(`Email został wysłany pomyślnie do ${mailData.to}`);
      return true;
    } catch (error) {
      this.logger.error(
        `Błąd podczas wysyłania emaila: ${error.message}`,
        error.stack,
      );
      return false;
    }
  }

  async sendPaidEmail(
    to: string,
    orderId: string,
    customerName: string,
    productName: string,
    productPrice: string,
    subtotal: string,
    totalAmount: string,
    trackingUrl: string,
    discountCode?: string,
    discountAmount?: string,
  ): Promise<boolean> {
    return this.sendMail({
      to,
      subject: 'Zamówienie zostało opłacone',
      template: 'paid',
      context: {
        orderId,
        customerName,
        orderDate: '20.15.2025',
        productName,
        productPrice,
        subtotal,
        totalAmount,
        trackingUrl,
        discountCode,
        discountAmount,
      },
    });
  }
}
