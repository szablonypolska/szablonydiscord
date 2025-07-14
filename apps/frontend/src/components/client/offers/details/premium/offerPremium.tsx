"use client"

import { useEffect, } from "react"
import SummaryOrder from "../summaryOrder"
import { useOrderContext } from "@/context/OrderContext"
import { ShieldCheckIcon } from "lucide-react"
import DiscountCode from "../../discountCode"
import OfferPremiumInput from "./offerPremiumInputLink"
import OfferPremiumInputServerName from "./offerPremiumInputServerName"
import { motion } from "framer-motion"

export default function OfferPremium() {
	const { state, dispatch } = useOrderContext()

	useEffect(() => {
		dispatch({ type: "offers", payload: "premium" })
	}, [dispatch])

	return (
		<div className="flex items-start gap-5 w-full mt-8 max-lg:flex-col">
			<div className="w-full">
				<motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="flex justify-between items-start bg-box-color border border-border-color p-5 rounded-lg w-full max-md:flex-col">
					<div className="flex items-center gap-3 ">
						<div className="flex items-center justify-center w-14 h-14 bg-border-color rounded-lg">
							<ShieldCheckIcon className="w-7 h-7 text-primary-color" />
						</div>
						<div className="">
							<p className="font-semibold">Premium ochrona</p>
							<span className="text-sm text-text-color">{state.price.toFixed(2)}zł / serwer</span>
						</div>
					</div>
					<div className="bg-primary-color px-3 py-1 rounded-full text-sm max-md:mt-2 max-md:w-full max-md:text-center">Wybrany pakiet</div>
				</motion.div>
				<motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }} className="bg-box-color border border-border-color  rounded-lg w-full mt-5">
					<p className="font-semibold p-5">Dane serwera</p>
					<div className="w-full h-px bg-border-color"></div>
					<div className="p-5">
						<OfferPremiumInput />
						<OfferPremiumInputServerName />
					</div>
				</motion.div>
				<DiscountCode />
			</div>
			<SummaryOrder />
		</div>
	)
}
