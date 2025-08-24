import { BadGatewayException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@repo/shared';
import { Request, Response } from 'express';
import { CartDto } from '../dto/cart.dto';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class RemoveCartService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async removeItemFromCart(data: CartDto, req: Request) {
    try {
      if (!data.userId) return this.guest(data, req);

      const user = await this.prisma.client.user.findUnique({
        where: { userId: data.userId },
        include: { cart: true },
      });

      if (!user) return this.guest(data, req);

      const searchCart = user.cart.find(
        (item: { offerId: string }) => item.offerId === data.itemId,
      );

      await this.prisma.client.cartItem.delete({
        where: { id: searchCart.id },
      });

      return { message: 'Item removed from cart' };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async guest(data: CartDto, req: Request) {
    try {
      const cartId = req.cookies['cartId'];

      if (!cartId) throw new BadGatewayException('No cart found');

      const cart = await this.cacheManager.get(`cartId:${cartId}`);

      const cartItems = JSON.parse(cart as string);

      if (!cart) throw new BadGatewayException('No cart found');

      const checkItem = cartItems.some((el: string) => el === data.itemId);

      if (!checkItem) throw new BadGatewayException('No item found in cart');

      const arrayWithoutItem = cartItems.filter(
        (el: string) => el !== data.itemId,
      );

      await this.cacheManager.set(
        `cartId:${cartId}`,
        JSON.stringify(arrayWithoutItem),
        30 * 24 * 60 * 60 * 1000,
      );

      return { message: 'Item removed from cart' };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
