import { Offer } from "../offer/common"


export interface Order {
	id: string
	dateCreate: Date
	userId: string
	paymentIntentId?: string
	events?: OrderEvent[]
	products?: Products[]
	promoCode?: PromoCode
}

export interface PromoCode {
	id: number
	code: string
	usageCount: number
	maxUsageCount: number
	discount: number
	type: "PERCENTAGE" | "AMOUNT"
	scope: "PRODUCT" | "CART"
	expiredDate?: Date
}

export interface Products {
	id: number
	offerId: string
	price: number
	priceAfterDiscount: number
	refundPrice?: number
	orderId: string
	offer?: Offer
	refunded?: boolean
	refundedAmount?: number
	refunedDate?: Date
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
	REFUND_PENDING = "REFUND_PENDING",
	REFUNDED = "REFUNDED",
	PARTIALLY_REFUNDED = "PARTIALLY_REFUNDED",
}
