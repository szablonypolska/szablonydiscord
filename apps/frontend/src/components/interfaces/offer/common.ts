export interface Offer {
	id: string
	title: string
	description?: string
	price: number
	image: string
	benefits: string[]
	inStock: number
	recommended: boolean
	createdAt: Date
	category: "PROTECTION" | "SUBSCRIPTION" | "OTHER"
	deliveryMethod: "EMAIL" | "AUTOMATIC"
	status: "ACTIVE" | "INACTIVE" | "SOLD"
}
