"use client"

import { useOrderContext } from "@/context/OrderContext"
import verifyTemplates from "@/lib/templates/verifyTemplates"
import { CircleAlert, Loader2 } from "lucide-react"
import { useState, useEffect, useCallback } from "react"


export default function OfferPremiumInput() {
	const { state, dispatch } = useOrderContext()
	const [link, setLink] = useState<string>("")
	const [error, setError] = useState<string>("")
	const [loader, setLoader] = useState<boolean>(false)

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
		<div className="flex flex-col">
			<div className="flex flex-col">
				<div className="flex items-center justify-between">
					<label htmlFor="link" className="text-sm">
						Link do szablonu
					</label>
					<p className="text-xs font-semibold text-text-color">(opcjonalne)</p>
				</div>
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
	)
}
