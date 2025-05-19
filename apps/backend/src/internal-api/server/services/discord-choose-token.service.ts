import { Injectable } from '@nestjs/common';
import { PrismaService } from '@repo/shared';
import { Client } from 'discord.js-selfbot-v13';
import { TokenType } from '../interfaces/token.interface';

@Injectable()
export class DiscordChooseToken {
  constructor(private prisma: PrismaService) {}

  private client: Client;

  async choose() {
    this.client = new Client();
    const allToken: TokenType[] = await this.prisma.client.token.findMany({});
    let token: string = '';

    for await (const el of allToken) {
      try {
        await this.client.login(el.token);

        if (this.client.user.username && this.client.guilds.cache.size < 100) {
          token = el.token;
          break;
        } else {
          await this.prisma.client.token.delete({ where: { id: el.id } });
        }

        this.client.destroy();
      } catch (err) {
        console.log(err);
        await this.prisma.client.token.delete({ where: { id: el.id } });
        this.client.destroy();
      }
    }

    return token;
  }
}
