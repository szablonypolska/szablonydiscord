import { OrderType } from "../../../types/order"

export interface PromoCodeDetails {
	percentDiscount: number
	discount: boolean
	code: string
}

export interface AppState {
	price: number
	offers: OrderType
	discountDetails: PromoCodeDetails
	serverLink: string
	serverName: string
	serverId: string
}
