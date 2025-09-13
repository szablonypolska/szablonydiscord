"use client"

import { Button } from "@nextui-org/button"
import { Loader2, SquareArrowOutUpRight } from "lucide-react"
import ShoppingCartRemoveAllItem from "./button/StoppingCartRemoveAllItem"
import { useCartContext } from "@/context/CartContext"
import createPayments from "@/lib/payments/createPayments"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ShoppingCartFinalization({ cartLength }: { cartLength: number }) {
	const { item, promoCode, total, cart } = useCartContext()
	const { data: session } = useSession()
	const router = useRouter()
	const [loader, setLoader] = useState<boolean>(false)
	const unvavailableItems = item.reduce(
		(acc, curr) => {
			if (curr.status !== "ACTIVE" || curr.inStock == 0) {
				acc.unavailable += 1
			} else {
				acc.available += 1
			}

			return acc
		},
		{ unavailable: 0, available: 0 }
	)

	const handleCreatePayment = async () => {
		try {
			if (!item || !item.length) return
			setLoader(true)

			const data = await createPayments(cart, session?.user.id || "", promoCode.code)

			setLoader(false)
			if (data.ok) {
				router.push(data.paymentLink)
			}
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div className="">
			<div className="mt-5">
				<div className="flex items-center justify-between">
					<div className="">
						<p className="text-text-color text-sm">
							Całość ({unvavailableItems.available}/{unvavailableItems.available + unvavailableItems.unavailable} {cartLength && cartLength > 1 ? "przedmiotów" : "przedmiot"})
						</p>
						<div className="flex items-end gap-2">
							{promoCode.code && <span className="text-sm text-text-color line-through ">{total.beforeDiscounted.toFixed(2)} zł</span>}
							<p className="font-bold text-xl">{promoCode.code ? total.afterDiscounted.toFixed(2) : total.beforeDiscounted.toFixed(2)} zł</p>
						</div>
						{promoCode.code && <p className="text-sm text-primary-color">Zaoszczędzasz: {(total.beforeDiscounted - total.afterDiscounted).toFixed(2)} zł</p>}
						{unvavailableItems.unavailable > 0 && <p className="text-xs text-red-400 mt-1">{unvavailableItems.unavailable} niedostępne przedmioty</p>}
					</div>
					<div className="">
						<ShoppingCartRemoveAllItem />
					</div>
				</div>
			</div>
			<Button className="gap-3 bg-primary-color w-full rounded-lg mt-6 cursor-pointer disabled:bg-border-color  disabled:cursor-not-allowed disabled:text-text-color" disabled={!cartLength || !item.length || unvavailableItems.unavailable > 0 || loader} onPress={handleCreatePayment}>
				{!loader && (
					<>
						<SquareArrowOutUpRight className="w-5 h-5" />
						<p>Przejdź do kasy</p>
					</>
				)}
				{loader && <Loader2 className="w-5 h-5 animate-spin" />}
			</Button>
			{unvavailableItems.unavailable > 0 && <p className="text-xs text-red-400 text-center mt-3">Nie możesz przejść do koszyka z niedostępnymi przedmiotami</p>}
			<p className="text-xs text-text-color text-center mt-3">Płatności są obslugiwane przez operatora stripe</p>
		</div>
	)
}
