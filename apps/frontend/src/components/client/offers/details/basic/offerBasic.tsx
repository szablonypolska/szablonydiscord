"use client"

import { useEffect, useState } from "react"
import SummaryOrder from "../summaryOrder"
import { useOrderContext } from "@/context/OrderContext"
import { CircleAlert, Server, ShieldCheckIcon } from "lucide-react"
import DiscountCode from "../../discountCode"

export default function OfferBasic() {
	const { state, dispatch } = useOrderContext()
	const [link, setLink] = useState<string>("")
	const [error, setError] = useState<string>("")

	useEffect(() => {
		dispatch({ type: "offers", payload: "basic" })
	}, [])

	useEffect(() => {
		if (!link) return setError("")

		if (link.includes("https")) {
			dispatch({ type: "serverLink", payload: link })
			dispatch({ type: "blocked", payload: true })
			setError("")
		} else {
			dispatch({ type: "blocked", payload: false })
			setError("Link do szablonu jest niepoprawny")
		}
	}, [link])

	return (
		<div className="flex items-start gap-5 w-full mt-5">
			<div className="w-full">
				<div className="flex justify-between items-start bg-boxColor border border-borderColor p-5 rounded-lg w-full">
					<div className="flex items-center gap-3 ">
						<div className="flex items-center justify-center w-14 h-14 bg-borderColor rounded-lg">
							<ShieldCheckIcon className="w-7 h-7 text-primaryColor" />
						</div>
						<div className="">
							<p className="font-semibold">Podstawowa ochrona</p>
							<span className="text-sm text-textColor">{state.price}zł / serwer</span>
						</div>
					</div>
					<div className="bg-primaryColor px-3 py-1 rounded-full text-sm">Wybrany pakiet</div>
				</div>
				<div className="bg-boxColor border border-borderColor  rounded-lg w-full mt-5">
					<p className="font-semibold p-5">Dane serwera</p>
					<div className="w-full h-[1px] bg-borderColor"></div>
					<div className="p-5">
						<div className="flex flex-col">
							<label htmlFor="link" className="text-sm">
								Link do szablonu
							</label>
							<input
								type="text"
								id="link"
								className={`bg-altBackgroundColor border ${error ? "border-errorColor focus:ring-errorColor" : "border-borderColor focus:ring-primaryColor"} w-full p-3 rounded-xl mt-2 focus:outline-none placeholder:text-placeHolderTextColor focus:ring-1 
`}
								placeholder="https://szablonydiscord.pl/templates/"
								onChange={e => setLink(e.target.value)}
							/>
							<div className={`flex items-center gap-2 text-errorColor transition-all text-sm mt-1 ${error ? "h-5" : "h-0"}  overflow-hidden `}>
								<CircleAlert className="w-4 h-4" />
								<p>{error}</p>
							</div>
						</div>
					</div>
				</div>
				<DiscountCode />
			</div>
			<SummaryOrder />
		</div>
	)
}
