"use client"

import { CircleAlert } from "lucide-react"
import { Products } from "@/components/interfaces/order/common"
import AccountOrderRefundBoxPopup from "./AccountOrderRefundBoxPopup"

export default function AccountOrderRefundPopup({ eligibleProducts, selectedProducts, setSelectedProducts }: { eligibleProducts: Products[] | null; selectedProducts: Products[]; setSelectedProducts: React.Dispatch<React.SetStateAction<Products[]>> }) {
	const totalAmount = selectedProducts.reduce(
		(acc, product) => {
			return {
				price: acc.price + product.price,
				refundedAmount: acc.refundedAmount + (product.refundedAmount || 0),
			}
		},
		{ price: 0, refundedAmount: 0 }
	)

	return (
		<div>
			<div className="p-5">
				<div className="flex items-center gap-3 bg-primary-dark rounded-lg w-full p-4">
					<CircleAlert className="text-primary-color" />
					<div className="flex flex-col">
						<p className=" text-sm font-semibold">Informacja o zwrocie</p>
						<span className="text-xs mt-0.5 text-gray-300">Za zwrócone produkty otrzymasz 75% wartosci oraz dodatkowo -1,25 zł prowizji.</span>
					</div>
				</div>
			</div>
			<div className="px-5 pb-5">
				<h2 className=" font-medium">Wybierz produkty do zwrotu </h2>
				<AccountOrderRefundBoxPopup eligibleProducts={eligibleProducts} selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />
			</div>
			<div className="px-5 pb-5 mt-2">
				<div className="p-5 border border-border-color rounded-lg">
					<div className="flex items-center justify-between">
						<p className="text-text-color ">Wartość wybranych produktów:</p>
						<span className="font-semibold  ">{(totalAmount.price / 100).toFixed(2)} zł</span>
					</div>
					<div className="w-full h-[1px] bg-border-color my-3 "></div>
					<div className="flex items-center justify-between">
						<p className="text-text-color">Wartość zwrotu (75%):</p>
						<span className="font-semibold text-primary-color">{(totalAmount.refundedAmount / 100).toFixed(2)} zł</span>
					</div>
				</div>
			</div>
		</div>
	)
}
