import { Offer } from "../offer/common"

export interface Order {
	id: string
	dateCreate: Date
	userId: string
	paymentIntentId?: string
	events?: OrderEvent[]
	products?: Products[]
}

export interface Products {
	id: number
	offerId: string
	price: number
	priceAfterDiscount: number
	orderId: string
	offer?: Offer
}

export interface OrderEvent {
	id: number
	orderCode: string
	status: OrderStatus
	dateCreate: Date
	order?: Order
}

export enum OrderStatus {
	NEW = "NEW",
	PAID = "PAID",
	COMPLETED = "COMPLETED",
	CANCELED = "CANCELED",
}
