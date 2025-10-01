"use client"
import React, { createContext, useContext, useState, SetStateAction, Dispatch, useEffect, useCallback, useMemo } from "react"
import { Offer } from "@/components/interfaces/offer/common"
import loadCart from "@/lib/cart/loadCart"
import { useSession } from "next-auth/react"
import { DiscountProduct } from "@/components/interfaces/discount/common"
import getDiscountedPrice from "@/utils/discount/getDiscountedPrice"

interface CartContextType {
	viewCart: boolean
	setViewCart: Dispatch<SetStateAction<boolean>>
	cart: string[]
	setCart: Dispatch<SetStateAction<string[]>>
	item: Offer[]
	setItem: Dispatch<SetStateAction<Offer[]>>
	promoCode: DiscountProduct
	setPromoCode: Dispatch<SetStateAction<DiscountProduct>>
	getPrice: (offer: Offer) => number | undefined
	total: { beforeDiscounted: number; afterDiscounted: number }
	loadingCart: boolean
}

export const CartContext = createContext<CartContextType | null>(null)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
	const [viewCart, setViewCart] = useState<boolean>(false)
	const [cart, setCart] = useState<string[]>([])
	const [item, setItem] = useState<Offer[]>([])
	const [loadingCart, setLoadingCart] = useState<boolean>(false)
	const [promoCode, setPromoCode] = useState<DiscountProduct>({
		code: "",
		discount: 0,
		discountType: "PERCENTAGE",
		discountScope: "CART",
		promoProductsId: [],
	})
	const { data: session } = useSession()

	const fetchCart = useCallback(async () => {
		try {
			const cart = await loadCart(session?.user.id || "")

			setCart(cart.items)
		} catch (err) {
			console.log(err)
			setLoadingCart(true)
		}
	}, [session?.user.id])

	const getPrice = useCallback(
		(offer: Offer) => {
			return getDiscountedPrice(offer.id, offer.price, promoCode)
		},
		[promoCode]
	)

	const total = useMemo(() => {
		let before = 0
		let after = 0

		console.log(item)

		for (const o of item) {
			const price = getPrice(o)

			before += o.price
			after += price || 0
		}

		return { beforeDiscounted: before / 100, afterDiscounted: after / 100 }
	}, [item, getPrice])

	useEffect(() => {
		fetchCart()
	}, [session?.user.id, fetchCart])

	return <CartContext.Provider value={{ viewCart, setViewCart, cart, setCart, item, setItem, promoCode, setPromoCode, getPrice, total, loadingCart }}>{children}</CartContext.Provider>
}

export function useCartContext() {
	const ctx = useContext(CartContext)
	if (!ctx) {
		throw new Error("the context has not loaded yet")
	}

	return ctx
}
