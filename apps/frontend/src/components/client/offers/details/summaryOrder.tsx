"use client"

import { useOrderContext } from "@/context/OrderContext"
import createPayments from "@/lib/payments/createPayments"
import { Button } from "@nextui-org/button"
import { motion } from "framer-motion"
import { Lock, Timer, Loader2, ShoppingBag } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SummaryOrder() {
	const { state } = useOrderContext()
	const [loader, setLoader] = useState<boolean>(false)
	const router = useRouter()
	const { data: session } = useSession()
	const differencePrice = state.discountDetails.discount ? state.price * (state.discountDetails.percentDiscount / 100) : 0
	const newPrice = state.price - differencePrice

	const validation = () => {
		switch (state.offers) {
			case "basic":
				return state.serverLink ? true : false
			case "premium":
				return state.serverName ? true : false
			default:
				return false
		}
	}

	const buy = async () => {
		try {
			if (!validation()) return
			setLoader(true)
			const data = await createPayments(state.offers, session?.user.id || "", state.discountDetails?.code, state.serverLink, state.serverId, state.serverName)

			console.log(data)

			setLoader(false)
			router.push(data.link)
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.3 }} className="sticky top-0 left-0 bg-box-color border border-border-color p-5 rounded-xl w-88 shrink-0">
			<h2 className="font-semibold">Podsumowanie</h2>
			<div className="flex flex-col gap-4 mt-5">
				<div className="flex items-center justify-between">
					<p className="text-text-color">Wybrany typ ochrony</p>
					<p className="text-gray-200">{state.offers}</p>
				</div>
				{state.discountDetails.discount && (
					<div className="flex items-center justify-between">
						<p className="text-primary-color">Zniżka ({state.discountDetails.percentDiscount}%)</p>
						<p className="text-primary-color">-{differencePrice} zł</p>
					</div>
				)}
				<div className="flex items-center justify-between">
					<p className="text-text-color">Okres ochrony</p>
					<p className="text-gray-200">{state.offers === "basic" ? "jednorazowy" : "dozywotni"}</p>
				</div>
				<div className="w-full h-0.5 bg-border-color rounded-full"></div>
			</div>
			<div className="flex items-center justify-between mt-5">
				<span>Suma</span>
				<div className="flex items-center gap-2">
					{state.discountDetails.discount && <p className="text-text-color line-through">{state.price.toFixed(2)} zł</p>}
					<p className="text-2xl font-semibold">{state.discountDetails.discount ? newPrice : state.price.toFixed(2)} zł</p>
				</div>
			</div>
			{session && (
				<Button className={`mt-5 h-14 transition-all  rounded-xl w-full  disabled:cursor-not-allowed  ${!validation() || loader ? "bg-border-color" : " bg-primary-color "}`} disabled={!validation()} onPress={buy}>
					{loader && (
						<div className="flex items-center gap-3 text-gray-200">
							<Loader2 className="w-5 h-5 animate-spin" /> <span>Trwa sprawdzanie</span>
						</div>
					)}
					{!loader && (
						<div className="flex items-center gap-3 text-gray-200">
							<ShoppingBag className="w-5 h-5 " /> <span>Zamów teraz</span>
						</div>
					)}
				</Button>
			)}
			{!session && (
				<Link href="/login">
					<Button className="mt-5 h-14 transition-all  rounded-xl w-full  disabled:cursor-not-allowed bg-border-color ">
						<Lock className="w-5 h-5 " /> <span>Musisz się zalogować</span>
					</Button>
				</Link>
			)}
			<div className="flex gap-2 items-center justify-center mt-2 text-text-color">
				<Timer className="w-4 h-4" />
				<p className="text-sm">Realizacja: natychmiastowa</p>
			</div>
		</motion.div>
	)
}
