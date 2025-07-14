"use client"

import { useOrderContext } from "@/context/OrderContext"
import { CircleAlert } from "lucide-react"
import { useState, useEffect } from "react"

export default function OfferPremiumInputServerName() {
	const { state, dispatch } = useOrderContext()
	const [name, setName] = useState<string>("")
	const [error, setError] = useState<string>("")

	useEffect(() => {
		if (!name) return setError("")

		if (name.length <= 2) {
			setError("Nazwa serwera musi mieć między 2 a 100 znaków.")
			dispatch({ type: "serverName", payload: "" })
		} else {
			dispatch({ type: "serverName", payload: name })
			setError("")
		}
	}, [name, state.serverName, dispatch])

	return (
		<div className="flex flex-col mt-5">
			<div className="flex flex-col">
				<label htmlFor="link" className="text-sm">
					Nazwa serwera discord
				</label>
				<div className="relative w-full mt-2">
					<input
						type="text"
						id="link"
						defaultValue={state.serverName}
						className={`bg-alt-background-color border ${error ? "border-error-color focus:ring-error-color" : "border-border-color focus:ring-primary-color"} w-full p-3 rounded-xl  focus:outline-hidden placeholder:text-place-holder-text-color focus:ring-1 
							disabled:opacity-40 `}
						placeholder="np. Szabloniki"
						onChange={e => setName(e.target.value)}
					/>
				</div>
				<div className={`flex items-center gap-2 text-error-color transition-all text-sm mt-1 ${error ? "h-5" : "h-0"}  overflow-hidden `}>
					<CircleAlert className="w-4 h-4" />
					<p>{error}</p>
				</div>
			</div>
		</div>
	)
}
