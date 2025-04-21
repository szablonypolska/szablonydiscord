"use client"

import { useOrderContext } from "@/context/OrderContext"
import createPayments from "@/lib/payments/createPayments"
import { Button } from "@nextui-org/button"
import gsap from "gsap"
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

	const buy = async () => {
		try {
			if (!state.blocked) return
			setLoader(true)
			const data = await createPayments(state.offers, session?.user.id || "", state.discountDetails?.code, state.serverLink, state.serverId, state.serverName)

			setLoader(false)
			router.push(data.link)
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div className="sticky top-0 left-0 bg-boxColor border border-borderColor p-5 rounded-xl w-[22rem] flex-shrink-0">
			<h2 className="font-semibold">Podsumowanie</h2>
			<div className="flex flex-col gap-4 mt-5">
				<div className="flex items-center justify-between">
					<p className="text-textColor">Wybrany typ ochrony</p>
					<p className="text-gray-200">{state.offers}</p>
				</div>
				{state.discountDetails.discount && (
					<div className="flex items-center justify-between">
						<p className="text-primaryColor">Zniżka ({state.discountDetails.percentDiscount}%)</p>
						<p className="text-primaryColor">-{state.discountDetails.differencePrice} zł</p>
					</div>
				)}
				<div className="flex items-center justify-between">
					<p className="text-textColor">Okres ochrony</p>
					<p className="text-gray-200">{state.offers === "basic" ? "jednorazowy" : "dozywotni"}</p>
				</div>
				<div className="w-full h-0.5 bg-borderColor rounded-full"></div>
			</div>
			<div className="flex items-center justify-between mt-5">
				<span>Suma</span>
				<div className="flex items-center gap-2">
					{state.discountDetails.discount && <p className="text-textColor line-through">{state.price.toFixed(2)} zł</p>}
					<p className="text-2xl font-semibold">{state.discountDetails.discount ? state.discountDetails.newPrice.toFixed(2) : state.price.toFixed(2)} zł</p>
				</div>
			</div>
			{session && (
				<Button className={`mt-5 h-14 transition-all  rounded-xl w-full  disabled:cursor-not-allowed  ${!state.blocked || loader ? "bg-borderColor" : " bg-primaryColor"}`} disabled={!state.blocked} onPress={buy}>
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
					<Button className="mt-5 h-14 transition-all  rounded-xl w-full  disabled:cursor-not-allowed bg-borderColor ">
						<Lock className="w-5 h-5 " /> <span>Musisz się zalogować</span>
					</Button>
				</Link>
			)}
			<div className="flex gap-2 items-center justify-center mt-2 text-textColor">
				<Timer className="w-4 h-4" />
				<p className="text-sm">Realizacja: natychmiastowa</p>
			</div>
		</div>
	)
}
