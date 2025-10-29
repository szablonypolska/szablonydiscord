"use client"

import { ArrowLeft, Share2, Loader2, CircleAlert } from "lucide-react"
import { Order } from "@/components/interfaces/order/common"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useCallback, useEffect, useState } from "react"
import { Products } from "@/components/interfaces/order/common"
import checkEligibleRefunds from "@/lib/payments/eligibleRefunds"
import AccountOrderDetailsOrderData from "./AccountOrderDetailsOrderData"
import AccountOrderRefundPopupController from "../popup/AccountOrderRefundPopupController"

export default function AccountOrderDetailsOrder({ order, setOrderItem }: { order: Order | null; setOrderItem: (order: Order | null) => void }) {
	const [eligibleProducts, setEligibleProducts] = useState<Products[] | null>(null)
	const [viewPopup, setViewPopup] = useState<boolean>(false)
	const [error, setError] = useState<boolean>(false)
	const [loader, setLoader] = useState<boolean>(false)

	const fetchEligibleProducts = useCallback(async (id: string) => {
		if (!id) return

		try {
			setLoader(true)
			setError(false)

			const result = await checkEligibleRefunds(id)
			setEligibleProducts(result.refundableProducts)

			setLoader(false)
		} catch (err) {
			console.log(err)
			setError(true)
		}
	}, [])

	useEffect(() => {
		fetchEligibleProducts(order?.id || "")
	}, [order, fetchEligibleProducts])

	return (
		<>
			{viewPopup && <AccountOrderRefundPopupController eligibleProducts={eligibleProducts} setViewPopup={setViewPopup} viewPopup={viewPopup} />}
			<AnimatePresence>
				{order && (
					<>
						<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 w-full h-full bg-black/50 backdrop-blur-xs z-20"></motion.div>
						<motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.2 }} exit={{ x: 100, opacity: 0 }} className="flex flex-col fixed top-0 right-0 h-screen w-[40rem] max-md:w-full bg-background border-l border-border-color scrollbar scrollbar-thumb-alt-border-color scrollbar-track-border-color  overflow-y-auto z-50">
							<div className="flex items-center justify-between p-5 sticky bg-box-color border-b border-border-color top-0">
								<button className="cursor-pointer text-primary-color p-2 rounded-lg hover:bg-border-color" onClick={() => setOrderItem(null)}>
									<ArrowLeft className="w-5 h-5" />
								</button>
								<h3 className="font-semibold text-lg">Szczegóły zamówienia</h3>
								<button className="cursor-pointer text-primary-color p-2 rounded-lg hover:bg-border-color">
									<Share2 className="w-5 h-5" />
								</button>
							</div>
							<AccountOrderDetailsOrderData order={order} />
							<div className="p-5">
								{loader && (
									<div className="flex bg-primary-dark/50 h-12 rounded-lg items-center justify-center w-full">
										<Loader2 className="w-6 h-6 mr-2 animate-spin inline-block text-primary-color" />
									</div>
								)}
								{!error && eligibleProducts && eligibleProducts.length > 0 && (
									<Button className="bg-primary-dark/50 w-full text-primary-color py-6 text-lg font-medium cursor-pointer" onClick={() => setViewPopup(true)}>
										Zwróć produkty
									</Button>
								)}
								{!error && !loader && eligibleProducts?.length === 0 && (
									<div className="flex items-center gap-3 bg-box-color border border-border-color p-5 rounded-lg">
										<CircleAlert className="text-text-color w-5 h-5" />
										<div className="">
											<p className="font-semibold text-sm">Brak produktów do zwrotu</p>
											<span className="text-sm text-text-color/70">Nie posiadasz żadnych produktów, które kwalifikują się do zwrotu.</span>
										</div>
									</div>
								)}
								{error && (
									<div className="flex items-center gap-3 bg-box-color border border-border-color p-5 rounded-lg">
										<CircleAlert className="text-text-color w-5 h-5" />
										<div className="">
											<p className="font-semibold text-sm">Coś poszło nie tak</p>
											<span className="text-sm text-text-color/70">Wystąpił błąd podczas sprawdzania produktów kwalifikujących się do zwrotu. Spróbuj ponownie później.</span>
										</div>
									</div>
								)}
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	)
}
