"use client"

import { ShoppingCart, X } from "lucide-react"
import ShoppingCartDiscountCode from "./ShoppingCartDiscountCode"
import ShoppingCartItem from "./ShoppingCartItem"
import { useCartContext } from "@/context/CartContext"
import { AnimatePresence, motion } from "framer-motion"
import ShoppingCartFinalization from "./ShoppingCartFinalization"

export default function ShoppingCartPopup() {
	const { viewCart, setViewCart, cart } = useCartContext()

	return (
		<AnimatePresence>
			{viewCart && (
				<>
					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed top-0 left-0 w-full h-full bg-black/60 z-[120]"></motion.div>
					<motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} className="absolute top-1/2 left-1/2 -translate-1/2 bg-alt-background-color border border-border-color px-5 py-6 rounded-lg z-[130] w-[35rem] max-md:w-11/12 scale-105">
						<div className="flex justify-between items-center">
							<div className="flex items-center  gap-3">
								<ShoppingCart className="w-5 h-5 font-semibold" />
								<p className="font-medium text-lg">
									Koszyk ({cart && cart.length} {cart && cart.length > 1 ? "przedmiotów" : "przedmiot"})
								</p>
							</div>
							<button className="text-text-color p-2 hover:bg-text-color/10 rounded-lg cursor-pointer" onClick={() => setViewCart(false)}>
								<X className="w-4 h-4" />
							</button>
						</div>
						<ShoppingCartItem />
						<div className="mt-5">
							<div className="w-full h-[2px] bg-border-color"></div>
							<div className=" my-5">
								<ShoppingCartDiscountCode />
							</div>
							<div className="w-full h-[2px] bg-border-color"></div>
						</div>
						<ShoppingCartFinalization cartLength={cart && cart.length} />
					</motion.div>
				</>
			)}
		</AnimatePresence>
	)
}
