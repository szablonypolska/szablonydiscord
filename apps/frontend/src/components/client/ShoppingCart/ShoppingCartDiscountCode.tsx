"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { useCartContext } from "@/context/CartContext"
import { applyCode } from "@/utils/discount/applyCode"
import { Tag, Loader2, X, CircleAlert, XCircle } from "lucide-react"
import { useEffect, useState } from "react"

export default function ShoppingCartDiscountCode() {
	const [isChecked, setIsChecked] = useState(false)
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string>("")
	const [code, setCode] = useState<string>("")
	const { promoCode, setPromoCode } = useCartContext()
	const discountType = promoCode.discountType === "PERCENTAGE" ? `-${promoCode.discount}%` : `-${(promoCode.discount / 100).toFixed(2)} zł`

	const handleApplyCode = async (code: string) => {
		try {
			setLoading(true)
			const data = await applyCode(code)

			if (!data.ok) {
				setError(data.message)
			}

			if (data.ok) {
				setPromoCode({ ...data.data })
			}
			setLoading(false)
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		if (code !== "") return setError("")
	}, [code])

	return (
		<div className="">
			{promoCode.code && (
				<div className="flex items-center justify-between bg-darknes-primary-color/40 w-full border border-primary-color/30 p-2.5 rounded-lg">
					<div className="flex items-center gap-3">
						<div className="p-2 bg-darknes-primary-color w-fit rounded-lg">
							<Tag className="text-primary-color w-4 h-4" />
						</div>
						<div className="flex flex-col justify-center">
							<div className="flex items-center gap-2">
								<p className="font-medium text-sm">Kod rabatowy zastosowany</p>
								<span className="text-primary-color bg-darknes-primary-color px-2 rounded-full py-0.5 text-xs">{discountType}</span>
							</div>
							<p className="text-xs text-text-color">
								Kod: {promoCode.code} {promoCode.promoProductsId.length > 0 && `× ${promoCode.promoProductsId.length} produktów`}
							</p>
						</div>
					</div>
					<button className="text-text-color cursor-pointer mr-3" onClick={() => setPromoCode({ code: "", discount: 0, discountType: "PERCENTAGE", discountScope: "CART", promoProductsId: [] })}>
						<X className="w-5 h-5" />
					</button>
				</div>
			)}
			{!promoCode.code && (
				<>
					<div className={`flex items-center gap-3 ${isChecked ? "bg-darknes-primary-color/50 border-primary-color/30" : "bg-border-color border-alt-border-color"} border  p-3 rounded-lg w-full cursor-pointer`} onClick={() => setIsChecked(!isChecked)}>
						<Checkbox checked={isChecked} onChange={(): void => setIsChecked(!isChecked)}></Checkbox>
						<div className="flex items-center gap-2">
							<Tag className={`${isChecked ? "text-primary-color" : "text-text-color"} w-4 h-4`} />
							<p className="text-sm">Mam kod rabatowy</p>
						</div>
					</div>
					<div className={`${isChecked ? `${error ? "h-14" : "h-11"} mt-3 ` : "h-0 overflow-hidden"} transition-all`}>
						<div className="relative">
							<input type="text" className={`border ${error ? "border-red-500/90" : "border-alt-border-color"} bg-border-color h-11 px-3 rounded-lg w-full placeholder:text-sm focus:ring ring-primary-color/50 outline-0`} placeholder="Wpisz kod rabatowy" onChange={e => setCode(e.target.value)} />
							{!error && (
								<button className={`flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-2 bg-alt-border-color h-8 px-4 text-sm rounded-lg text-gray-100 disabled:opacity-50 ${loading || !code ? "opacity-50" : ""} ${loading ? "w-13" : "w-24"} cursor-pointer`} onClick={() => handleApplyCode(code)}>
									{loading ? <Loader2 className="animate-spin w-5 h-5 text-text-color" /> : "Zastosuj"}
								</button>
							)}

							{error && (
								<div className="flex items-center gap-2 bg-red-500/90 py-1 px-2 rounded-lg w-fit absolute top-1/2 -translate-y-1/2 right-2">
									<XCircle className="w-4 h-4" />
									<p className="text-xs font-medium">Błąd</p>
								</div>
							)}
						</div>
						{error && (
							<div className="flex items-center gap-2 text-red-500/90 py-1 px-2 rounded-lg">
								<CircleAlert className="w-4 h-4" />
								<p className="text-xs font-medium">{error}</p>
							</div>
						)}
					</div>
				</>
			)}
		</div>
	)
}
