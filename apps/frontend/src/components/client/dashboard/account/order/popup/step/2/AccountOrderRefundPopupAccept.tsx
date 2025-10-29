import { CircleCheck, Package, Shield } from "lucide-react"
import { Products } from "@/components/interfaces/order/common"

export default function AccountOrderRefundPopupAccept({ selectedProducts }: { selectedProducts: Products[] }) {
	const totalAmount = selectedProducts.reduce((acc, product) => {
		acc += product.refundPrice || product.priceAfterDiscount || product.price
		return acc
	}, 0)
	const formattedTotalAmount = (totalAmount / 100).toFixed(2)

	return (
		<div className="px-5">
			<div className="flex flex-col items-center p-5  mb-5 bg-primary-dark rounded-lg mx">
				<CircleCheck className="text-primary-color w-12 h-12 mb-3" />
				<h2 className="text-lg font-semibold">Czy na pewno chcesz zwrócić wybrane produkty?</h2>
				<p className="mt-2 text-sm text-text-color">
					Po zatwierdzeniu rozpoczniemy proces zwrotu środków w wysokości <span className="text-white font-semibold">{formattedTotalAmount} zł</span>
				</p>
			</div>
			<div className="mb-5 p-5 bg-box-color rounded-lg border border-border-color">
				<div className="flex items-center gap-2">
					<Package className="w-4.5 h-4.5 text-primary-color" />
					<p className="font-medium text-sm">Wybrane produkty do zwrotu:</p>
				</div>
				<div className="flex flex-col gap-3 mt-3 w-full">
					{selectedProducts.map(product => {
						const productPrice = ((product.refundPrice || product.priceAfterDiscount || product.price) / 100).toFixed(2)

						return (
							<div className="flex items-center justify-between bg-background p-3 rounded-lg border border-border-color w-full" key={product.id}>
								<div className="flex items-center gap-3 ">
									<div className=" flex items-center justify-center bg-border-color rounded-lg w-10 h-10">
										<Shield className="w-6 h-6 text-primary-color" />
									</div>
									<p className="font-medium">{product.offer?.title}</p>
								</div>
								<span className="text-primary-color font-medium">{productPrice} zł</span>
							</div>
						)
					})}
				</div>
				<div className="w-full h-[1px] bg-border-color my-5"></div>
				<div className="flex items-center justify-between">
					<p className="font-medium">Razem do zwrotu:</p>
					<span className="text-primary-color font-semibold text-lg">{formattedTotalAmount} zł</span>
				</div>
			</div>
		</div>
	)
}
