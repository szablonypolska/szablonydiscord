"use client"

import { Button } from "@nextui-org/button"
import { CircleAlert, Loader2, Check } from "lucide-react"
import { useEffect, useState } from "react"
import vetifyDiscountCode from "@/lib/payments/verifyPromoCode"
import { useOrderContext } from "@/context/OrderContext"

export default function DiscountCode() {
	const [loader, setLoader] = useState<boolean>(false)
	const [error, setError] = useState<string>("")
	const [code, setCode] = useState<string>("")
	const [success, setSuccess] = useState<boolean>(false)
	const { state, dispatch } = useOrderContext()

	useEffect(() => {
		if (code !== "") return setError("")
	}, [code])

	const applyCode = async () => {
		try {
			if (!code) return setError("Pole nie może być puste")
			setLoader(true)
			setSuccess(false)
			setError("")
			const checkCode = await vetifyDiscountCode(state.offers, code)

			if (checkCode.statusCode === 404) {
				dispatch({ type: "discountDetails", payload: { differencePrice: 0, newPrice: 0, percentDiscount: 0, code: "", discount: false } })
				setError("Wpisany kod promocyjny nie istnieje")
				setLoader(false)
				return
			}

			if (checkCode.type === "lowPrice") {
				dispatch({ type: "discountDetails", payload: { differencePrice: 0, newPrice: 0, percentDiscount: 0, code: "", discount: false } })
				setError("Kwota zamówienia nie moze byc nizsza niz 2.50 zł")
				setLoader(false)
				return
			}

			if (checkCode.type === "exceededLimit") {
				dispatch({ type: "discountDetails", payload: { differencePrice: 0, newPrice: 0, percentDiscount: 0, code: "", discount: false } })
				setError("Wykorzystano limit użyć kodu promocyjnego")
				setLoader(false)
				return
			}

			dispatch({
				type: "discountDetails",
				payload: { differencePrice: checkCode.differencePrice, newPrice: checkCode.newPrice, code: checkCode.code, percentDiscount: checkCode.percentDiscount, discount: true },
			})
			setError("")
			setLoader(false)
			setSuccess(true)
		} catch (err) {
			setError("Wystapil blad serwera, sprobuj pozniej")
			setLoader(false)
			console.log(err)
		}
	}

	return (
		<>
			<div className="bg-boxColor border border-borderColor rounded-lg w-full mt-5">
				<p className="font-semibold p-5">Kod promocyjny</p>

				<div className="w-full h-[1px] bg-borderColor"></div>

				<div className="p-5 transition-all">
					<div className="flex items-center gap-3">
						<div className="relative w-full">
							<input
								type="text"
								id="link"
								defaultValue={state.discountDetails.code || code}
								className={`bg-altBackgroundColor border  w-full p-3 h-12 rounded-xl focus:outline-none placeholder:text-placeHolderTextColor focus:ring-1  ${error ? "border-errorColor focus:ring-errorColor" : "border-borderColor focus:ring-primaryColor"}
  `}
								placeholder="Wpisz kod promocyjny"
								onChange={e => setCode(e.target.value)}
							/>
							{success && <Check className="absolute top-1/2 -translate-y-1/2 right-2 text-primaryColor w-5 h-5" />}
						</div>

						<Button className={`flex items-center bg-borderColor rounded-xl h-12 transition-all   ${loader ? "opacity-70 w-14" : "w-32"}`} onPress={applyCode}>
							{loader && <Loader2 className=" animate-spin" />}
							{!loader && <span>Zastosuj</span>}
						</Button>
					</div>
					<div className={`flex items-center gap-2 text-errorColor transition-all text-sm mt-1 ${error ? "h-5" : "h-0"}  overflow-hidden `}>
						<CircleAlert className="w-4 h-4" />
						<p>{error}</p>
					</div>
				</div>
			</div>
		</>
	)
}
