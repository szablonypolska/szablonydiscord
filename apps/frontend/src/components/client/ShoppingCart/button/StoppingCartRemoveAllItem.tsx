"use client"

import { useCartContext } from "@/context/CartContext"
import removeCart from "@/lib/cart/removeCart"
import { Button } from "@nextui-org/button"
import { Trash2 } from "lucide-react"
import { useSession } from "next-auth/react"

export default function StoppingCartRemoveAllItem() {
	const { setCart, setItem, cart } = useCartContext()
	const { data: session } = useSession()

	const handleRemoveAll = async () => {
		try {
			await removeCart("basic", session?.user.id || "", true)
			setCart([])
			setItem([])
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<Button className="border border-primary-color text-primary-color rounded-lg text-sm cursor-pointer disabled:cursor-not-allowed disabled:opacity-70" disabled={cart ? cart.length === 0 : true} onPress={handleRemoveAll}>
			<Trash2 className="w-4 h-4" /> Resetuj koszyk
		</Button>
	)
}
