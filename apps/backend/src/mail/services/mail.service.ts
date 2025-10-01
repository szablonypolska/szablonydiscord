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

  async sendTemplateAddedEmail(
    to: string,
    templateId: string,
    slugUrl: string,
  ): Promise<boolean> {
    return this.sendMail({
      to,
      subject: 'Twój szablon Discord został dodany',
      template: 'templatesAdded',
      context: {
        templateId,
        addedDate: new Date().toLocaleDateString(),
        slugUrl,
      },
    });
  }

  async sendPaidEmail(
    to: string,
    products: any[],
    totalPrice: number,
  ): Promise<boolean> {
    return this.sendMail({
      to,
      subject: 'Zamówienie zostało opłacone',
      template: 'paid',
      context: {
        products,
        totalPrice
      },
    });
  }
}
