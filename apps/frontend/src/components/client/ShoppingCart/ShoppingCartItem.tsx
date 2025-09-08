"use client"

import { useCartContext } from "@/context/CartContext"
import loadCartItem from "@/lib/cart/loadCartItem"
import { Shield, Infinity, Mail, Package, Clock } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { motion } from "framer-motion"
import ShoppingCartRemoveItem from "./button/ShoppingCartRemoveItem"

export default function ShoppingCartItem() {
	const { cart, item, setItem, promoCode, getPrice } = useCartContext()
	const [loading, setLoading] = useState<boolean>(true)

	const fetchData = useCallback(async () => {
		try {
			if (!cart) return setLoading(false)
			if (cart && !cart.length) {
				setItem([])
				setLoading(false)
				return
			}

			const data = await loadCartItem(cart)

			setItem(data.details)
			setLoading(false)
		} catch (err) {
			console.log(err)
		}
	}, [cart, setItem, setLoading])

	useEffect(() => {
		fetchData()
	}, [fetchData])

	return (
		<div className={`overflow-hidden ${item && item.length && "transition-[max-height] duration-500 ease-in-out"}  `} style={{ maxHeight: `${loading ? 9 : item && !item.length ? 9 : item.length * 8}rem` }}>
			{loading && (
				<div className="flex items-center justify-between bg-border-color w-full p-3 rounded-lg mt-3">
					<div className="flex items-center gap-3">
						<div className="bg-alt-border-color p-3 py-3 rounded-lg w-fit animate-pulse">
							<div className="w-7 h-7"></div>
						</div>
						<div className="flex flex-col">
							<div className="w-28 bg-alt-border-color h-4 rounded-full animate-pulse"></div>
							<div className="  w-36 bg-alt-border-color h-3 rounded-full mt-1.5 animate-pulse"></div>
						</div>
					</div>
					<div className="flex items-center gap-5 mr-5">
						<p className="font-semibold text-sm"></p>
						<div className="w-7 h-7 bg-alt-border-color rounded-lg animate-pulse"></div>
					</div>
				</div>
			)}
			{!loading && item.length === 0 && (
				<div className="flex flex-col justify-center items-center my-10">
					<div className="flex items-center justify-center bg-border-color w-17 h-17 rounded-full">
						<Package className="w-8 h-8 text-text-color" />
					</div>
					<p className="text-text-color mt-2">Twój koszyk jest pusty</p>
				</div>
			)}
			<div className={`max-h-[16rem] ${item && item.length > 2 && "scrollbar overflow-y-auto"} scrollbar-thumb-alt-border-color scrollbar-track-border-color   `}>
				{item &&
					!loading &&
					item.map((offer, index) => {
						const isUnavailable: boolean = offer.status !== "ACTIVE" || offer.inStock == 0
						const amountPln = offer.price / 100
						const promo = getPrice(offer)
						const promoPln = promo && (promo / 100).toFixed(2)
						const viewDiscount = promo && promoCode.discountScope === "PRODUCT" && promo !== offer.price

						return (
							<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", delay: index * 0.15 }} key={offer.id} className={`${item && item.length > 2 && "mr-2"}`}>
								<div className={` flex items-center justify-between bg-border-color w-full p-3 ${isUnavailable || offer.deliveryMethod !== "EMAIL" ? "rounded-lg" : "rounded-t-lg"} mt-3 h-[5rem] ${isUnavailable && "opacity-50 z-[-1]"}`}>
									<div className="flex items-center gap-3">
										<div className="bg-primary-color p-3 py-3 rounded-lg w-fit">
											<Shield className="w-7 h-7" />
										</div>
										<div className="flex flex-col">
											<div className="flex items-center gap-2">
												<p className="text-sm font-medium">{offer.title}</p>
												{isUnavailable && (
													<div className="flex items-center gap-1.5 bg-alt-border-color px-2 py-1 rounded-full text-text-color text-[10px]">
														<Clock className="w-3 h-3" />
														<p>Niedostępne</p>
													</div>
												)}
											</div>

											<span className="flex items-center gap-1 text-xs text-text-color">
												{amountPln.toFixed(2)} × {offer.inStock === -1 ? <Infinity className="w-3.5 h-3.5" /> : offer.inStock} in stock
											</span>
										</div>
									</div>
									<div className={`flex items-center gap-5 mr-5 ${isUnavailable && "z-[100]"}`}>
										<div className="flex flex-col">
											{viewDiscount && <p className="font-semibold text-[10px] text-text-color line-through">{amountPln.toFixed(2)} zł</p>}
											<p className={`font-semibold text-sm ${isUnavailable && "line-through"} ${viewDiscount && "text-primary-color"}`}>{viewDiscount ? promoPln : amountPln.toFixed(2)} zł</p>
										</div>
										<ShoppingCartRemoveItem itemId={offer.id} item={item} setItem={setItem} isUnavailable={isUnavailable} />
									</div>
								</div>
								{!isUnavailable && offer.deliveryMethod === "EMAIL" && (
									<div className="flex items-center gap-2 border-x-2 border-b-2 border-border-color rounded-b-lg p-2 px-3">
										<Mail className="w-3.5 h-3.5 text-primary-color" />
										<p className="text-xs text-text-color">Produkt zostanie dostarczony na twojego maila.</p>
									</div>
								)}
							</motion.div>
						)
					})}
			</div>
		</div>
	)
}
