import { Module } from '@nestjs/common';
import { ShoppingController } from './shopping.controller';
import { AddCartService } from './services/add-cart.service';
import { SharedModule } from '@repo/shared';
import { RemoveCartService } from './services/remove-cart.service';
import { CartService } from './services/cart.service';



@Module({
  imports: [SharedModule],
  controllers: [ShoppingController],
  providers: [AddCartService, RemoveCartService, CartService],
})
export class ShoppingModule {}
