"use client"

import { Products } from "@/components/interfaces/order/common"
import { Shield, CircleCheckBig } from "lucide-react"
import clsx from "clsx"

export default function AccountOrderRefundBoxPopup({ eligibleProducts, selectedProducts, setSelectedProducts }: { eligibleProducts: Products[] | null; selectedProducts: Products[]; setSelectedProducts: React.Dispatch<React.SetStateAction<Products[]>> }) {
	const selectProduct = (product: Products) => {
		if (selectedProducts.includes(product)) {
			const filtredProducts = selectedProducts.filter(p => p.id !== product.id)
			setSelectedProducts(filtredProducts)
		} else {
			setSelectedProducts(prev => {
				return [...prev, product]
			})
		}
	}

	return (
		<div className="flex flex-col gap-3 mt-3">
			{eligibleProducts &&
				eligibleProducts?.map(product => {
					const price = ((product.priceAfterDiscount || product.price) / 100).toFixed(2)
					const refundedPrice = ((product.refundPrice || 0) / 100).toFixed(2)
					return (
						<div className={clsx("border border-border-color   p-4 rounded-lg cursor-pointer", selectedProducts.includes(product) && "border-primary-color")} onClick={() => selectProduct(product)} key={product.id}>
							<div className="flex  items-center gap-3">
								<div className={clsx("w-6 h-6 border border-border-color rounded-sm", selectedProducts.includes(product) && "flex items-center justify-center bg-primary-color")}>{selectedProducts.includes(product) && <CircleCheckBig className="w-3.5 h-3.5" />}</div>

								<div className="flex items-center justify-between w-full">
									<div className="flex items-center gap-3">
										<div className="flex items-center justify-center bg-border-color w-12 h-12 rounded-lg ">
											<Shield className="text-primary-color w-6 h-6" />
										</div>
										<div className="">
											<p className="font-medium">{product.offer?.title}</p>
											<span className="text-sm text-text-color">ID: {product.id}</span>
										</div>
									</div>
									<div className="text-right">
										<p className="font-semibold">{price} zł</p>
										{selectedProducts.includes(product) && <span className="text-primary-color text-xs">Zwrot: {refundedPrice} zł </span>}
									</div>
								</div>
							</div>
						</div>
					)
				})}
		</div>
	)
}
