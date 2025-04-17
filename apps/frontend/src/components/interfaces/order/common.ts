import { OrderType } from "../../../types/order"

export interface PromoCodeDetails {
	differencePrice: number
	newPrice: number
	percentDiscount: number
	discount: boolean
	code: string
}

export interface AppState {
	price: number
	offers: OrderType
	discountDetails: PromoCodeDetails
	blocked: boolean
	serverLink: string
	serverName: string
	serverId: string
}
