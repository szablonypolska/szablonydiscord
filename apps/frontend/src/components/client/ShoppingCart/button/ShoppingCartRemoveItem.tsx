"use client"

import removeCart from "@/lib/cart/removeCart"
import { Trash2 } from "lucide-react"
import { Offer } from "@/components/interfaces/offer/common"
import { useCartContext } from "@/context/CartContext"
import { useSession } from "next-auth/react"

export default function ShoppingCartRemoveItem({ itemId, item, setItem, isUnavailable }: { itemId: string; item: Offer[]; setItem: React.Dispatch<React.SetStateAction<Offer[]>>; isUnavailable: boolean }) {
	const { cart, setCart } = useCartContext()
	const { data: session } = useSession()

	const handleRemove = async () => {
		try {
			if (!cart) return
			await removeCart(itemId, session?.user?.id || "")

			const removeItem = item.filter(el => el.id !== itemId)
			const removeItemFromCart = cart.filter(el => el !== itemId)
			setItem(removeItem)
			setCart(removeItemFromCart)
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<button onClick={handleRemove} className={` cursor-pointer ${isUnavailable ? "z-[100] text-white" : "text-text-color"}`}>
			<Trash2 className="w-5 h-5  hover:text-red-500 transition-[color]" />
		</button>
	)
}
