"use client"

import { useEffect, useRef } from "react"
import SummaryOrder from "../summaryOrder"
import { useOrderContext } from "@/context/OrderContext"
import { ShieldCheckIcon } from "lucide-react"
import DiscountCode from "../../discountCode"

import gsap from "gsap"
import OfferPremiumInput from "./offerPremiumInputLink"
import OfferPremiumInputServerName from "./offerPremiumInputServerName"

export default function OfferPremium() {
	const { state, dispatch } = useOrderContext()
	const animation = useRef<HTMLDivElement>(null)

	useEffect(() => {
		dispatch({ type: "offers", payload: "premium" })
	}, [])

	useEffect(() => {
		gsap.to(animation.current, {
			opacity: 1,
			duration: 0.5,
			y: -10,
			ease: "ease out",
		})
	}, [])

	return (
		<div className="flex items-start gap-5 w-full mt-8 max-lg:flex-col opacity-0" ref={animation}>
			<div className="w-full">
				<div className="flex justify-between items-start bg-boxColor border border-borderColor p-5 rounded-lg w-full">
					<div className="flex items-center gap-3 ">
						<div className="flex items-center justify-center w-14 h-14 bg-borderColor rounded-lg">
							<ShieldCheckIcon className="w-7 h-7 text-primaryColor" />
						</div>
						<div className="">
							<p className="font-semibold">Premium ochrona</p>
							<span className="text-sm text-textColor">{state.price.toFixed(2)}zł / serwer</span>
						</div>
					</div>
					<div className="bg-primaryColor px-3 py-1 rounded-full text-sm">Wybrany pakiet</div>
				</div>
				<div className="bg-boxColor border border-borderColor  rounded-lg w-full mt-5">
					<p className="font-semibold p-5">Dane serwera</p>
					<div className="w-full h-[1px] bg-borderColor"></div>
					<div className="p-5">
						<OfferPremiumInput />
						<OfferPremiumInputServerName />
					</div>
				</div>
				<DiscountCode />
			</div>
			<SummaryOrder />
		</div>
	)
}
