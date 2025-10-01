import { Offer } from 'src/interfaces/offer.interface';

export interface Order {
  id: string;
  dateCreate: Date;
  userId: string;
  paymentIntentId?: string;
  events?: OrderEvent[];
  products?: Products[];
}

export interface Products {
  id: number;
  offerId: string;
  price: number;
  priceAfterDiscount: number;
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
}

export enum OrderStatus {
  NEW = 'NEW',
  PAID = 'PAID',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}
