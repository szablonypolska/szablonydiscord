import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CartDto } from '../dto/cart.dto';
import { Request, Response } from 'express';
import { PrismaService } from '@repo/shared';
import { randomUUID } from 'crypto';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class AddCartService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async addItemToCart(data: CartDto, req: Request, res: Response) {
    try {
      if (!data.userId) return this.guest(data, req, res);

      const user = await this.prisma.client.user.findUnique({
        where: { userId: data.userId },
        include: { cart: true },
      });

      if (!user) return this.guest(data, req, res);

      const check = user.cart.some(
        (item: { offerId: string }) => item.offerId === data.itemId,
      );

      if (check) {
        return {
          ok: false,
          message: 'Item already in cart',
          code: 'ITEM_ALREADY_IN_CART',
        };
      }

      await this.prisma.client.cartItem.create({
        data: {
          userId: data.userId,
          offerId: data.itemId,
        },
      });

      return {
        ok: true,
        message: 'Item added to cart successfully',
        offer: data.itemId,
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async guest(data: CartDto, req: Request, res: Response) {
    try {
      const cartId = req.cookies['cartId'].value;
      let generatedCartId: string = randomUUID();
      let scaleData: string[] = [];

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
      const parsedData = await JSON.parse(cachedData as string);

      if (parsedData && parsedData.includes(data.itemId)) {
        return {
          ok: false,
          message: 'Item already in cart',
          code: 'ITEM_ALREADY_IN_CART',
        };
      }

      if (parsedData) {
        scaleData = [...parsedData, data.itemId];
      } else {
        scaleData = [data.itemId];
      }

      await this.cacheManager.set(
        `cartId:${cartId || generatedCartId}`,
        JSON.stringify(scaleData),
        30 * 24 * 60 * 60 * 1000,
      );

      return {
        ok: true,
        message: 'Item added to cart successfully',
        offer: data.itemId,
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
