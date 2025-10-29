"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { X, ChevronRight, ChevronLeft } from "lucide-react"
import { Products } from "@/components/interfaces/order/common"
import { AnimatePresence } from "framer-motion"
import { Button } from "@nextui-org/button"
import AccountOrderRefundPopup from "./step/1/AccountOrderRefundPopup"
import clsx from "clsx"
import AccountOrderRefundPopupAccept from "./step/2/AccountOrderRefundPopupAccept"

export default function AccountOrderRefundPopupController({ eligibleProducts, setViewPopup, viewPopup }: { eligibleProducts: Products[] | null; setViewPopup: (view: boolean) => void; viewPopup: boolean }) {
	const [currentStep, setCurrentStep] = useState<number>(1)
	const [selectedProducts, setSelectedProducts] = useState<Products[]>([])

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
							<Button className={clsx("w-1/2 bg-box-color border border-border-color rounded-lg h-12 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed", currentStep === 2 && "bg-primary-dark")} disabled={selectedProducts.length === 0} onPress={() => (currentStep === 1 ? setCurrentStep(2) : null)}>
								{currentStep === 1 ? (
									<>
										Dalej <ChevronRight className="w-4 h-4" />
									</>
								) : (
									<span>Potwierdź zwrot</span>
								)}
							</Button>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	)
}
