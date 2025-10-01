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
	category: OfferCategory
	deliveryMethod: "EMAIL" | "AUTOMATIC"
	status: "ACTIVE" | "INACTIVE" | "SOLD"
}

export type OfferCategory = "PROTECTION" | "SUBSCRIPTION" | "OTHER"
