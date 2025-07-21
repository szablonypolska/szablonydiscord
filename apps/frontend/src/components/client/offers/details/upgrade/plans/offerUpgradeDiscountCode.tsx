"use client"

import { applyCode } from "@/utils/discount/applyCode"
import { HelpCircle, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"

export default function OfferUpgradeDiscountCode({ setDiscountValue }: { setDiscountValue: (value: number) => void }) {
	const [discountCode, setDiscountCode] = useState<string>("")
	const [loader, setLoader] = useState<boolean>(false)
	const [error, setError] = useState<string>("")

	const send = async () => {
		if (!discountCode) return setError("Pole nie może być puste")
		setLoader(true)

		const data = await applyCode("upgrade", discountCode)

		if (!data.success) {
			setError(data.message)
			setLoader(false)
			return
		}

		setDiscountValue(data.percentDiscount)

		setLoader(false)
	}

	useEffect(() => {
		setError("")
	}, [discountCode])

	return (
		<div className="mt-5">
			<label htmlFor="discount-code" className="text-text-color text-sm">
				Kod rabatowy
			</label>
			<div className="flex items-start  gap-2 mt-1.5">
				<div className="w-full">
					<div className="w-full relative">
						<input type="text" id="discount-code" className={`bg-box-color border p-3 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-primary-color ${error ? "border-error-color" : "border-border-color"}  `} onChange={e => setDiscountCode(e.target.value)} placeholder="Wpisz kod rabatowy" />
						{loader && <Loader2 className="absolute -translate-y-1/2 top-1/2 right-3 w-5 h-5 animate-spin text-text-color" />}
					</div>
					<div className={`flex items-center gap-2 text-error-color text-sm mt-1 ${error ? "h-5" : "h-0"} overflow-hidden transition-all`}>
						<HelpCircle className="w-3 h-3 " />
						<p>{error}</p>
					</div>
				</div>
				<button className="p-3 bg-border-color px-4 rounded-lg cursor-pointer disabled:opacity-40" disabled={loader} onClick={send}>
					Zastosuj
				</button>
			</div>
		</div>
	)
}
