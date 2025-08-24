import { Controller, Post, HttpCode, Body, Req, Res } from '@nestjs/common';
import { AddCartService } from './services/add-cart.service';
import { CartDto } from './dto/cart.dto';
import { Request, Response } from 'express';
import { RemoveCartService } from './services/remove-cart.service';
import { CartService } from './services/cart.service';
import { GetCartDto } from './dto/get-cart.dto';

@Controller('/api/internal/shop')
export class ShoppingController {
  constructor(
    private readonly addCartService: AddCartService,
    private readonly removeCartService: RemoveCartService,
    private readonly cartService: CartService,
  ) {}

  @Post('/add')
  @HttpCode(200)
  addItem(
    @Body() data: CartDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.addCartService.addItemToCart(data, req, res);
  }

  @Post('/remove')
  @HttpCode(200)
  removeItem(@Body() data: CartDto, @Req() req: Request) {
    return this.removeCartService.removeItemFromCart(data, req);
  }

  @Post('/cart')
  @HttpCode(200)
  getCartItems(
    @Body() data: GetCartDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.cartService.getCartItems(data, req, res);
  }
}
