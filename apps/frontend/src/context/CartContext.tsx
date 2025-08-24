"use client"
import React, { createContext, useContext, useState, SetStateAction, Dispatch, useEffect, useCallback } from "react"
import { Offer } from "@/components/interfaces/offer/common"
import loadCart from "@/lib/cart/loadCart"
import { useSession } from "next-auth/react"

interface CartContextType {
	view: boolean
	setView: Dispatch<SetStateAction<boolean>>
	cartItem: Offer[]
	setCartItem: Dispatch<SetStateAction<Offer[]>>
}

export const CartContext = createContext<CartContextType | null>(null)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
	const [view, setView] = useState<boolean>(false)
	const [cartItem, setCartItem] = useState<Offer[]>([])
	const { data: session } = useSession()

	const fetchCart = async () => {
		try {
			const cart = await loadCart("")

			setCartItem(cart.items)
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		fetchCart()
	}, [session?.user.id])

	return <CartContext.Provider value={{ view, setView, cartItem, setCartItem }}>{children}</CartContext.Provider>
}

export function useCartContext() {
	const ctx = useContext(CartContext)
	if (!ctx) {
		throw new Error("the context has not loaded yet")
	}

	return ctx
}
