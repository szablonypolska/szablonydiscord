import { OrderType } from "../../../types/order"

export interface AppState {
	price: number
	offers: OrderType
	discount: number
	blocked: boolean
	serverLink: string
	serverName: string
	serverId: string
}
