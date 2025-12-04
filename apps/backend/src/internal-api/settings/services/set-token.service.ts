import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SetTokenDto } from '../dto/set-token.dto';
import { encrypt } from 'src/common/utils/encrypt/encrypt';
import { PrismaService } from '@repo/shared';
import { User } from '../../../interfaces/user.interface';
import { Client } from 'discord.js-selfbot-v13';

@Injectable()
export class SetTokenService {
  constructor(private prisma: PrismaService) {}
  private client: Client;

  async setToken(data: SetTokenDto) {
    try {
      const user: User | null = await this.prisma.client.user.findUnique({
        where: { userId: data.userId },
      });
      let details: {
        server: number;
        username: string;
        serverLimit: number;
      } | null = null;

      if (!user) {
        throw new UnauthorizedException({
          ok: false,
          message: 'User not found',
        });
      }

      try {
        this.client = new Client();
        await this.client.login(data.token);

        details = {
          server: this.client.guilds.cache.size,
          username: this.client.user.username,
          serverLimit: this.client.user.premiumType === 2 ? 200 : 100,
        };
      } catch (err) {
        throw new UnauthorizedException({
          ok: false,
          message: 'Invalid token',
        });
      }

      const encryptedToken = encrypt(data.token);

      await this.prisma.client.user.update({
        where: { userId: data.userId },
        data: { token: encryptedToken },
      });

      return {
        ok: true,
        ...details,
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
