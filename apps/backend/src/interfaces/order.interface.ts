import { Offer } from 'src/interfaces/offer.interface';
import { DiscountProduct } from './discount.interface';

export interface Order {
  id: string;
  dateCreate: Date;
  userId: string;
  paymentIntentId?: string;
  events?: OrderEvent[];
  products?: Products[];
  promoCode?: DiscountProduct;
}

export interface Products {
  id: number;
  offerId: string;
  price: number;
  priceAfterDiscount: number;
  refundPrice?: number;
  orderId: string;
  offer?: Offer;
  protections?: Protection[];
}

export interface OrderEvent {
  id: number;
  orderCode: string;
  status: OrderStatus;
  dateCreate: Date;
  order?: Order;
}

export interface Protection {
  id: string;
  dateCreate: Date;
  idServer?: string;
  name?: string;
  type: 'BASIC' | 'PREMIUM' | 'ADVANCED' | 'OTHER';
  orderProductId: number;
  orderProduct?: Products;
  refunded?: boolean;
  refundedAmount?: number;
  refunedDate?: Date;
}

export enum OrderStatus {
  NEW = 'NEW',
  PAID = 'PAID',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
  REFUND_PENDING = 'REFUND_PENDING',
  REFUNDED = 'REFUNDED',
  PARTIALLY_REFUNDED = 'PARTIALLY_REFUNDED',
}
