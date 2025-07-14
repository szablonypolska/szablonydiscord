"use client"

import { useCallback, useEffect, useState } from "react"
import SummaryOrder from "../summaryOrder"
import { useOrderContext } from "@/context/OrderContext"
import { CircleAlert, Loader2, ShieldCheckIcon } from "lucide-react"
import DiscountCode from "../../discountCode"
import verifyTemplates from "@/lib/templates/verifyTemplates"
import { motion } from "framer-motion"


export default function OfferBasic() {
	const { state, dispatch } = useOrderContext()
	const [link, setLink] = useState<string>("")
	const [error, setError] = useState<string>("")
	const [loader, setLoader] = useState<boolean>(false)

	useEffect(() => {
		dispatch({ type: "offers", payload: "basic" })
	}, [dispatch])

	const verifyTemplatesLink = useCallback(async () => {
		try {
			setLoader(true)
			const getData = await verifyTemplates(link)

			if (getData === 400) return (setError("Link do szablonu nie dziala"), setLoader(false))

			dispatch({ type: "serverLink", payload: link })

			setError("")
			setLoader(false)
		} catch (err) {
			console.log(err)
			setError("Wystapil blad serwera, sprobuj pozniej")
			setLoader(false)
		}
	}, [link, dispatch])

	useEffect(() => {
		if (!link) return setError("")

		if (link.includes(`${process.env.NEXT_PUBLIC_HOSTNAME}/templates`)) verifyTemplatesLink()

		if (!link.includes(`${process.env.NEXT_PUBLIC_HOSTNAME}/templates`)) {
			dispatch({ type: "serverLink", payload: "" })
			setError("Link do szablonu jest niepoprawny")
		}
	}, [link, state.serverLink, dispatch, verifyTemplatesLink])

	return (
		<div className="flex items-start gap-5 w-full mt-8 max-lg:flex-col">
			<div className="w-full">
				<motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="flex justify-between items-start bg-box-color border border-border-color p-5 rounded-lg w-full max-md:flex-col">
					<div className="flex items-center gap-3 ">
						<div className="flex items-center justify-center w-14 h-14 bg-border-color rounded-lg">
							<ShieldCheckIcon className="w-7 h-7 text-primary-color" />
						</div>
						<div className="">
							<p className="font-semibold">Podstawowa ochrona</p>
							<span className="text-sm text-text-color">{state.price.toFixed(2)}zł / serwer</span>
						</div>
					</div>
					<div className="bg-primary-color px-3 py-1 rounded-full text-sm max-md:mt-2 max-md:w-full max-md:text-center">Wybrany pakiet</div>
				</motion.div>
				<motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.3 }} className="bg-box-color border border-border-color  rounded-lg w-full mt-5">
					<p className="font-semibold p-5">Dane serwera</p>
					<div className="w-full h-px bg-border-color"></div>
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
									disabled={!!state.serverLink}
									className={`bg-alt-background-color border ${error ? "border-error-color focus:ring-error-color" : "border-border-color focus:ring-primary-color"} w-full p-3 rounded-xl  focus:outline-hidden placeholder:text-place-holder-text-color focus:ring-1 
disabled:opacity-40 `}
									placeholder="https://szablonydiscord.pl/templates/"
									onChange={e => setLink(e.target.value)}
								/>

								{loader && (
									<div className="absolute top-1/2 -translate-y-1/2 right-4">
										<Loader2 className="w-7 h-7 text-primary-color animate-spin" />
									</div>
								)}
							</div>
							<div className={`flex items-center gap-2 text-error-color transition-all text-sm mt-1 ${error ? "h-5" : "h-0"}  overflow-hidden `}>
								<CircleAlert className="w-4 h-4" />
								<p>{error}</p>
							</div>
						</div>
					</div>
				</motion.div>
				<DiscountCode />
			</div>
			<SummaryOrder />
		</div>
	)
}
