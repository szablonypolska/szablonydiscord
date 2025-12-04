import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenDto } from '../dto/token.dto';
import { PrismaService } from '@repo/shared';
import { decrypt } from 'src/common/utils/encrypt/decrypt';
import { User } from '../../../interfaces/user.interface';
import { Client } from 'discord.js-selfbot-v13';

@Injectable()
export class TokenService {
  constructor(private readonly prisma: PrismaService) {}
  private client: Client;

  async getToken(data: TokenDto) {
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
        throw new BadRequestException({
          ok: false,
          message: 'User not found',
        });
      }

      if (!user.token) {
        return { ok: false, message: 'No token set' };
      }

      try {
        this.client = new Client();
        const decryptedToken = decrypt(user.token);
        await this.client.login(decryptedToken);

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

      return {
        ok: true,
        ...details,
      };
    } catch (err) {
      console.log(err);
    }
  }
}
