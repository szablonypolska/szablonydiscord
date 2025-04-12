"use client"
import React, { createContext, useContext, useState, Dispatch, SetStateAction, useEffect } from "react"

import { OrderType } from "../types/order"

interface OrderContextType {
	price: number
	setPrice: Dispatch<SetStateAction<number>>
	offers: OrderType
	setOffers: Dispatch<SetStateAction<OrderType>>
	discount: number
	setDiscount: Dispatch<SetStateAction<number>>
}

export const OrderContext = createContext<OrderContextType | null>(null)

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
	const [price, setPrice] = useState<number>(0)
	const [offers, setOffers] = useState<OrderType>("basic")
	const [discount, setDiscount] = useState<number>(0)

	useEffect(() => {
		const prices: Record<OrderType, number> = {
			basic: 5.5,
			premium: 12.5,
			advanced: 20.5,
		}

		setPrice(prices[offers])
	}, [offers])

	return <OrderContext.Provider value={{ price, setPrice, offers, setOffers, discount, setDiscount }}>{children}</OrderContext.Provider>
}

export function useOrderContext() {
	const ctx = useContext(OrderContext)
	if (!ctx) {
		throw new Error("the context has not loaded yet")
	}

	return ctx
}
