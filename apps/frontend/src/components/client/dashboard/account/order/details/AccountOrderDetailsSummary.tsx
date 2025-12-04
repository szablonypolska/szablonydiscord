import { Order } from "@/components/interfaces/order/common"
import { useMemo } from "react"

export function AccountOrderDetailsSummary({ order }: { order: Order }) {
	const calculatePrice = useMemo(() => {
		return (
			order?.products &&
			order.products.reduce(
				(acc, product) => {
					acc.price += product.price || 0
					acc.priceAfterDiscount += product.priceAfterDiscount || 0
					acc.refundedAmount += product.refundedAmount || 0
					if (product.priceAfterDiscount) {
						acc.totalFinalPrice += product.priceAfterDiscount
					} else {
						acc.totalFinalPrice += product.price || 0
					}

					return acc
				},
				{ price: 0, priceAfterDiscount: 0, refundedAmount: 0, totalFinalPrice: 0 }
			)
		)
	}, [order?.products])
	console.log(calculatePrice, "calculatePrice", order.products)
	const finalPrice = (calculatePrice?.totalFinalPrice || 0) - (calculatePrice?.refundedAmount || 0)

	console.log(calculatePrice?.price || calculatePrice?.priceAfterDiscount || 0, calculatePrice?.refundedAmount || 0, calculatePrice)

	return (
		<div className="mt-10">
			<div className="bg-box-color border border-border-color rounded-lg p-5">
				<p className="font-semibold text-lg">Podsumowanie</p>
				<div className="mt-3">
					<div className="flex items-center justify-between">
						<p className=" text-text-color/70">Wartość produktów:</p>
						<span>{((calculatePrice?.price || 0) / 100).toFixed(2)} zł</span>
					</div>

					{calculatePrice && calculatePrice.priceAfterDiscount > 0 && (
						<div className="flex items-center justify-between mt-3">
							<p className=" text-text-color/70">Zniżki:</p>
							<span className="text-primary-color">-{(calculatePrice.priceAfterDiscount / 100).toFixed(2)} zł</span>
						</div>
					)}
					{calculatePrice && calculatePrice.refundedAmount > 0 && (
						<div className="flex items-center justify-between mt-3">
							<p className=" text-text-color/70">Zwrócono:</p>
							<span className="text-text-color font-semibold">{((calculatePrice?.refundedAmount || 0) / 100).toFixed(2)} zł</span>
						</div>
					)}
				</div>
				<div className="w-full my-4 bg-border-color h-[1px]"></div>
				<div className="flex items-center justify-between mt-3 text-lg font-semibold">
					<p>Razem</p>
					<span>{(finalPrice / 100).toFixed(2)} zł</span>
				</div>
			</div>
		</div>
	)
}
