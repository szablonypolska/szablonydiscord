import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class RefreshTokenService {
  constructor(private readonly configService: ConfigService) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  async updateToken() {
    try {
      //   const client = new OAuth2Client(
      //     this.configService.get<string>('GMAIL_CLIENT_ID'),
      //     this.configService.get<string>('GMAIL_CLIENT_SECRET'),
      //   );

      //   client.setCredentials({
      //     refresh_token: this.configService.get<string>('GMAIL_REFRESH_TOKEN'),
      //   });

      //   const tokens = await client.getAccessToken();

      //   this.configService.set<string>(
      //     'GMAIL_ACCESS_TOKEN',
      //     tokens.res.data.access_token,
      //   );

      console.log('elo');
    } catch (err) {
      console.log(err);
    }
  }
}
