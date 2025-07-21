"use client"

import { Button } from "@nextui-org/button"
import { CircleAlert, Loader2, Check } from "lucide-react"
import { useEffect, useState } from "react"
import { useOrderContext } from "@/context/OrderContext"
import { motion } from "framer-motion"
import { applyCode } from "@/utils/discount/applyCode"

export default function DiscountCode() {
	const [loader, setLoader] = useState<boolean>(false)
	const [error, setError] = useState<string>("")
	const [code, setCode] = useState<string>("")
	const [success, setSuccess] = useState<boolean>(false)
	const { state, dispatch } = useOrderContext()

	useEffect(() => {
		if (code !== "") return setError("")
	}, [code])

	const send = async () => {
		if (!code) return setError("Pole nie może być puste")

		setLoader(true)
		const verifyCode = await applyCode(state.offers, code)

		if (!verifyCode.success) {
			setError(verifyCode.message)
			setLoader(false)
			return
		}

		dispatch({
			type: "discountDetails",
			payload: {
				percentDiscount: verifyCode.percentDiscount,
				code: verifyCode.code,
				discount: true,
			},
		})
		setError("")
		setSuccess(true)
		setLoader(false)
	}

	return (
		<>
			<motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.3 }} className="bg-box-color border border-border-color rounded-lg w-full mt-5">
				<p className="font-semibold p-5">Kod promocyjny</p>

				<div className="w-full h-px bg-border-color"></div>

				<div className="p-5 transition-all">
					<div className="flex items-center gap-3">
						<div className="relative w-full">
							<input
								type="text"
								id="link"
								defaultValue={state.discountDetails.code || code}
								className={`bg-alt-background-color border  w-full p-3 h-12 rounded-xl focus:outline-hidden placeholder:text-place-holder-text-color focus:ring-1  ${error ? "border-error-color focus:ring-error-color" : "border-border-color focus:ring-primary-color"}
  `}
								placeholder="Wpisz kod promocyjny"
								onChange={e => setCode(e.target.value)}
							/>
							{success && <Check className="absolute top-1/2 -translate-y-1/2 right-2 text-primary-color w-5 h-5" />}
						</div>

						<Button className={`flex items-center bg-border-color rounded-xl h-12 transition-all cursor-pointer   ${loader ? "opacity-70 w-14" : "w-32"}`} onPress={send}>
							{loader && <Loader2 className=" animate-spin" />}
							{!loader && <span>Zastosuj</span>}
						</Button>
					</div>
					<div className={`flex items-center gap-2 text-error-color transition-all text-sm mt-1 ${error ? "h-5" : "h-0"}  overflow-hidden `}>
						<CircleAlert className="w-4 h-4" />
						<p>{error}</p>
					</div>
				</div>
			</motion.div>
		</>
	)
}
