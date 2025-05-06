import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { MailService } from './services/mail.service';
import refreshAccessToken from 'src/common/utils/refreshAccessToken';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        try {
          const accessToken = await refreshAccessToken();

          return {
            transport: {
              host: 'smtp.gmail.com',
              port: 465,
              auth: {
                type: 'OAuth2',
                user: config.get('GMAIL_USER'),
                clientId: config.get('GMAIL_CLIENT_ID'),
                clientSecret: config.get('GMAIL_CLIENT_SECRET'),
                refreshToken: config.get('GMAIL_REFRESH_TOKEN'),
                accessToken: accessToken,
              },
              debug: true,
            },
            defaults: {
              from: `"${config.get('MAIL_FROM_NAME', 'Aplikacja')}" <${config.get('GMAIL_USER')}>`,
            },
            template: {
              dir: join(__dirname, 'templates'),
              adapter: new HandlebarsAdapter(),
              options: {
                strict: true,
              },
            },
          };
        } catch (error) {
          console.error('Błąd konfiguracji OAuth:', error);
          throw error;
        }
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
