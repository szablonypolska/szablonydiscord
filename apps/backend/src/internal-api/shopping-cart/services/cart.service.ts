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
      include: { cart: true },
    });

    if (!user) return this.guest(req, res);

    return {
      ok: true,
      items: user.cart.map((item: { offerId: string }) => item.offerId),
    };
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

      const cartIdValue = req.cookies['cartId'].value || generatedCartId;

      const cachedData = await this.cacheManager.get(
        `cartId:${cartIdValue || generatedCartId}`,
      );
      const items = JSON.parse(cachedData as string);

      return { ok: true, items };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
