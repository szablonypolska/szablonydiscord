import { DiscountProduct } from "@/components/interfaces/discount/common"

export default function getDiscountedPrice(offerId: string, price: number, data: DiscountProduct): number | undefined {
	try {
		if (!data || data.code === "") return

		if (data.discountScope === "CART") return data.discountType === "PERCENTAGE" ? price * (1 - data.discount / 100) : price - data.discount

		const checkIsInPromo = data.promoProductsId.filter(id => id === offerId)

		const promoPrice = data.discountType === "PERCENTAGE" ? price * (1 - data.discount / 100) : price - data.discount

		if (checkIsInPromo.length === 0) return price

		return promoPrice
	} catch (err) {
		console.log(err)
	}
}
