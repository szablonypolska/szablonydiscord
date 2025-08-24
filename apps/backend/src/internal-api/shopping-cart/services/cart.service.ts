import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { BadGatewayException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@repo/shared';
import { Request, Response } from 'express';
import { CartDto } from '../dto/cart.dto';
import { randomUUID } from 'crypto';
import { GetCartDto } from '../dto/get-cart.dto';

export class CartService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getCartItems(data: GetCartDto, req: Request, res: Response) {
    if (!data.userId) return this.guest(req, res);

    const user = await this.prisma.client.user.findUnique({
      where: { userId: data.userId },
      include: { cart: { include: { offer: true } } },
    });

    if (!user) return this.guest(req, res);

    return { items: user.cart.map((item) => item.offer) };
  }

  async guest(req: Request, res: Response) {
    try {
      const cartId = req.cookies['cartId'];
      let generatedCartId: string = randomUUID();

      if (!cartId) {
        res.cookie('cartId', {
          value: generatedCartId,
          httpOnly: true,
          sameSite: 'lax',
        });
      }

      const cachedData = await this.cacheManager.get(
        `cartId:${cartId || generatedCartId}`,
      );
      const items = JSON.parse(cachedData as string);

      if (!items) throw new BadGatewayException('No cart found');

      const offers = await this.prisma.client.offer.findMany({
        where: {
          code: { in: items },
        },
      });

      return { items: offers };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
