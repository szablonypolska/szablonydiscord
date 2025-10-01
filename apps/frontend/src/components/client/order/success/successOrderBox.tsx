"use client"

import { motion } from "framer-motion"
import { Button } from "@nextui-org/button"
import { Copy, ShoppingBag, ShoppingCart, WalletCards, Clock } from "lucide-react"
import Link from "next/link"
import { Order } from "@/components/interfaces/order/common"
import { formatDate } from "date-fns"

export default function SuccessOrderBox({ order }: { order: Order }) {
	console.log("zwraca", order)

	const theRestInTheEmail = order.products && order.products.length > 3 ? order.products.length - 3 : 0
	const count =
		order.products &&
		order.products.reduce((acc, product) => {
			return acc + (product.priceAfterDiscount || product.price)
		}, 0)

	const formatedCount = ((count || 0) / 100).toFixed(2)

	return (
		<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }} className="bg-box-color w-[45rem] max-md:w-11/12 border border-border-color rounded-lg p-8 mt-7 border-t-8 border-t-primary-color">
			<div className="flex max-md:flex-col md:items-center justify-between">
				<div className="">
					<h2 className="text-xl font-semibold">Potwierdzenie zamówienia</h2>
					<p className="text-text-color">Zamówienie zostało złożone i potwierdzone</p>
				</div>
				<div className="flex items center gap-4 max-md:justify-between max-md:mt-4">
					<p className="text-2xl font-semibold">{formatedCount} zł</p>
					<div className="bg-darknes-primary-color px-3 py-1 rounded-full w-fit ">
						<p className="text-primary-color">Opłacone</p>
					</div>
				</div>
			</div>
			<div className="my-5 bg-border-color w-full h-[1px]"></div>
			<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.2 }}>
				<div className="bg-border-color/50 p-5 rounded-lg">
					<p className="mb-2 text-text-color text-sm">Twój numer zamówienia</p>
					<div className="flex items-center gap-2 w-full">
						<div className="flex items-center bg-alt-background-color h-12 px-3 rounded-lg border border-alt-border-color w-full">
							<p className="font-mono">#{order.id}</p>
						</div>
						<Button className="bg-border-color rounded-lg px-4 h-12">
							<Copy className="w-5.5 h-5.5" />
						</Button>
					</div>
				</div>
				<div className="flex  gap-5 mt-5 w-full max-md:flex-col md:h-40">
					<div className="w-1/2 rounded-lg bg-border-color/40 p-4 max-md:w-full h-full">
						<div className="flex items-center gap-3 text-primary-color">
							<WalletCards className="w-5 h-5" />
							<p className="font-medium">Szczegóły zakupu</p>
						</div>
						<div className="flex flex-col gap-2 mt-2">
							<div className="flex items-center justify-between">
								<p className="text-text-color text-sm">Email:</p>
								<p className=" text-sm">example@example.com</p>
							</div>
							<div className="flex items-center justify-between">
								<p className="text-text-color text-sm">Data zakupu:</p>
								<p className=" text-sm">{formatDate(new Date(order.dateCreate), "dd.MM.yyyy")}</p>
							</div>
							<div className="flex items-center justify-between">
								<p className="text-text-color text-sm">Metoda płatności:</p>
								<p className=" text-sm">Stripe</p>
							</div>
						</div>
					</div>
					<div className="w-1/2 rounded-lg bg-border-color/40 p-4 max-md:w-full h-full">
						<div className="flex items-center gap-3 text-primary-color">
							<ShoppingBag className="w-5 h-5" />
							<p className="font-medium">Zakupione produkty ({order.products?.length})</p>
						</div>
						<div className="flex flex-col justify-between mt-2 h-full">
							<div className="flex flex-col gap-2">
								{order.products?.slice(0, 3).map(product => {
									const productPrice = ((product.priceAfterDiscount || product.price) / 100).toFixed(2)

									return (
										<div className="flex items-center justify-between gap-4" key={product.id}>
											<div className="flex flex-1 items-center gap-2 min-w-0">
												<div className="bg-primary-color w-2 h-2 rounded-full flex-shrink-0"></div>
												<p className="text-sm truncate">{product.offer?.title}</p>
											</div>
											<p className="text-sm  font-medium flex-shrink-0">{productPrice} zł</p>
										</div>
									)
								})}

								<p className="text-xs text-primary-color">Szczegóły w e-mailu {theRestInTheEmail > 0 ? `(+${theRestInTheEmail})` : ""}</p>
							</div>
						</div>
					</div>
				</div>
			</motion.div>
			<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.8 }} className="flex max-sm:flex-col items-center gap-5 w-full mt-9">
				<Link href="offer" className="flex items-center justify-center w-1/2 bg-border-color rounded-lg py-6 gap-3 flex-shrink-0 h-12 cursor-pointer z-10 max-sm:w-full">
					<ShoppingCart className="w-5 h-5" /> <span>Przeglądaj więcej ofert</span>
				</Link>
				<Link href={`/order/${order.id}`} className="flex items-center justify-center w-1/2 bg-primary-color rounded-lg py-6 gap-3 flex-shrink-0 h-12 cursor-pointer z-10 max-sm:w-full">
					<Clock className="w-5 h-5" /> <span>Śledzenie zamówienia</span>
				</Link>
			</motion.div>
		</motion.div>
	)
}
