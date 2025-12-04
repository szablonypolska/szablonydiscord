"use client"

import { Dispatch, useState } from "react"
import { motion } from "framer-motion"
import { X, ChevronRight, ChevronLeft, Loader2 } from "lucide-react"
import { Order, Products, OrderStatus } from "@/components/interfaces/order/common"
import { AnimatePresence } from "framer-motion"
import { Button } from "@nextui-org/button"
import AccountOrderRefundPopup from "./step/1/AccountOrderRefundPopup"
import clsx from "clsx"
import AccountOrderRefundPopupAccept from "./step/2/AccountOrderRefundPopupAccept"
import refundProcess from "@/lib/payments/refundsProcess"
import { useSession } from "next-auth/react"

interface Props {
	orderId: string
	eligibleProducts: Products[] | null
	setViewPopup: (view: boolean) => void
	viewPopup: boolean
	setOrders: Dispatch<React.SetStateAction<Order[]>>
}

export default function AccountOrderRefundPopupController({ orderId, eligibleProducts, setViewPopup, viewPopup, setOrders }: Props) {
	const [currentStep, setCurrentStep] = useState<number>(1)
	const [selectedProducts, setSelectedProducts] = useState<Products[]>([])
	const [error, setError] = useState<boolean>(false)
	const [loader, setLoader] = useState<boolean>(false)
	const { data: session } = useSession()

	const startRefundProcess = async () => {
		if (!selectedProducts.length) return

		try {
			setError(false)
			setLoader(true)
			const productsId = selectedProducts.map(product => product.id)
			console.log(session?.user.id || "", orderId, productsId)
			const data = await refundProcess(session?.user.id || "", orderId, productsId)

			if (!data.ok) return setError(true)

			setOrders(prev =>
				prev.map(order => {
					if (order.id === orderId) {
						return {
							...order,
							events: [
								...(order.events || []),
								{
									id: Date.now() + Math.floor(Math.random() * 1000),
									orderId: orderId,
									status: OrderStatus.REFUND_PENDING,
									createdAt: new Date(),
								},
							],
						}
					}
					return order
				})
			)

			setLoader(false)
			setViewPopup(false)
		} catch (err) {
			setError(true)
			setLoader(false)
			console.log(err)
		}
	}

	return (
		<AnimatePresence>
			{viewPopup && (
				<>
					<div className="fixed inset-0 w-full h-full bg-black/50 backdrop-blur-xs z-[100]"></div>
					<motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background border border-border-color rounded-lg z-[100] w-[38rem]">
						<div className="flex items-center justify-between p-5 border-b border-border-color">
							<p className="text-lg font-semibold">Zwrot produktów</p>
							<button className="cursor-pointer" onClick={() => setViewPopup(false)}>
								<X className="" />
							</button>
						</div>
						<div className="p-5 w-full">
							<div className="flex items-center w-full">
								<div className="w-1/2">
									<div className="flex items-center">
										<div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-color">
											<p className="text-xs">1</p>
										</div>
										<div className="w-full h-2 bg-primary-color -ml-1 z-[-1]"></div>
									</div>
									<p className={clsx("text-xs text-primary-color", currentStep === 1 && "font-semibold")}>Wybór produktów</p>
								</div>
								<div className="w-1/2 -ml-1">
									<div className="flex items-center">
										<div className={clsx("flex items-center justify-center w-6 h-6 rounded-full bg-border-color", currentStep === 2 && "bg-primary-color")}>
											<p className="text-xs">2</p>
										</div>
										<div className={clsx("w-full h-2 bg-border-color rounded-r-full -ml-1 z-[-1]", currentStep === 2 && "bg-primary-color")}></div>
									</div>
									<p className={clsx("text-xs ", currentStep === 2 ? "text-primary-color font-semibold" : "text-text-color")}>Potwierdzenie</p>
								</div>
							</div>
						</div>
						{currentStep === 1 ? <AccountOrderRefundPopup eligibleProducts={eligibleProducts} selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} /> : <AccountOrderRefundPopupAccept selectedProducts={selectedProducts} />}
						{error && <p className="text-center text-sm text-red-500 mb-3">Wystąpił błąd podczas przetwarzania zwrotu. Spróbuj ponownie później.</p>}
						<div className="flex items-center gap-3 px-5 pb-5">
							<Button className="w-1/2 bg-box-color border border-border-color rounded-lg h-12 cursor-pointer" onPress={() => (currentStep === 1 ? setViewPopup(false) : setCurrentStep(1))}>
								{currentStep === 1 ? (
									"Anuluj"
								) : (
									<>
										<ChevronLeft className="w-5 h-5" /> <span>Wstecz</span>
									</>
								)}
							</Button>
							{currentStep === 2 ? (
								<Button className="w-1/2 bg-box-color border border-border-color rounded-lg h-12 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed bg-primary-dark" disabled={loader} onPress={startRefundProcess}>
									{loader ? <Loader2 className="animate-spin" /> : <span>Potwierdź zwrot</span>}
								</Button>
							) : (
								<Button className="w-1/2 bg-box-color border border-border-color rounded-lg h-12 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" disabled={selectedProducts.length === 0} onPress={() => setCurrentStep(2)}>
									Dalej <ChevronRight className="w-4 h-4" />
								</Button>
							)}
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	)
}
