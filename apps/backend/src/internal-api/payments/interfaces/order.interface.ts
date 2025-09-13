export interface Order {
  id: string;
  dateCreate: Date;
  userId: string;
  orderPaymentLink?: string;
  events?: OrderEvent[];
  products?: Products[];
}

export interface Products {
  id: number;
  offerId: string;
  price: number;
  priceAfterDiscount: number;
  orderId: string;
}

export interface OrderEvent {
  id: number;
  orderCode: string;
  status: OrderStatus;
  date: Date;
  order?: Order;
}

export enum OrderStatus {
  NEW = 'NEW',
  PAID = 'PAID',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}
