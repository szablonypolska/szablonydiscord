"use client"

import { useEffect, useRef, useState } from "react"
import SummaryOrder from "../summaryOrder"
import { useOrderContext } from "@/context/OrderContext"
import { CircleAlert, Loader2, Server, ShieldCheckIcon } from "lucide-react"
import DiscountCode from "../../discountCode"
import verifyTemplates from "@/lib/templates/verifyTemplates"
import gsap from "gsap"

export default function OfferBasic() {
	const { state, dispatch } = useOrderContext()
	const [link, setLink] = useState<string>("")
	const [error, setError] = useState<string>("")
	const [loader, setLoader] = useState<boolean>(false)
	const animation = useRef<HTMLDivElement>(null)

	useEffect(() => {
		dispatch({ type: "offers", payload: "basic" })
	}, [])

	const verifyTemplatesLink = async () => {
		try {
			setLoader(true)
			const getData = await verifyTemplates(link)

			if (getData === 400) return setError("Link do szablonu nie dziala"), setLoader(false)

			console.log("wywyouje sie")

			dispatch({ type: "serverLink", payload: link })
			dispatch({ type: "blocked", payload: true })
			setError("")
			setLoader(false)
		} catch (err) {
			console.log(err)
			setError("Wystapil blad serwera, sprobuj pozniej")
			setLoader(false)
		}
	}

	useEffect(() => {
		if (!link) return setError("")

		if (link.includes(`${process.env.NEXT_PUBLIC_HOSTNAME}/templates`)) verifyTemplatesLink()

		if (!link.includes(`${process.env.NEXT_PUBLIC_HOSTNAME}/templates`)) {
			dispatch({ type: "blocked", payload: false })
			setError("Link do szablonu jest niepoprawny")
		}
	}, [link, state.serverLink])

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
							<p className="font-semibold">Podstawowa ochrona</p>
							<span className="text-sm text-textColor">{state.price.toFixed(2)}zł / serwer</span>
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
							<div className="relative w-full mt-2">
								<input
									type="text"
									id="link"
									defaultValue={state.serverLink}
									disabled={state.blocked}
									className={`bg-altBackgroundColor border ${error ? "border-errorColor focus:ring-errorColor" : "border-borderColor focus:ring-primaryColor"} w-full p-3 rounded-xl  focus:outline-none placeholder:text-placeHolderTextColor focus:ring-1 
disabled:opacity-40 `}
									placeholder="https://szablonydiscord.pl/templates/"
									onChange={e => setLink(e.target.value)}
								/>

								{loader && (
									<div className="absolute top-1/2 -translate-y-1/2 right-4">
										<Loader2 className="w-7 h-7 text-primaryColor animate-spin" />
									</div>
								)}
							</div>
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
