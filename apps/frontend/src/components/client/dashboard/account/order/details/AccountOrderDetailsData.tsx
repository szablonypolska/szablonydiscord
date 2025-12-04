"use client"

import { Order } from "@/components/interfaces/order/common"
import { Copy, Shield, CircleCheckBig } from "lucide-react"
import { format } from "date-fns/format"
import { pl } from "date-fns/locale"
import { translateOrderEvents } from "@/utils/translateOrderEvents"
import clsx from "clsx"
import { useState } from "react"
import { Button } from "@nextui-org/button"
import { AccountOrderDetailsSummary } from "./AccountOrderDetailsSummary"

export default function AccountOrderDetailsData({ order }: { order: Order }) {
	const [visibleProducts, setVisibleProducts] = useState<number>(3)
	const sortedEventsOnDate = order?.events && order.events.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
	const lastStatus = order?.events && order.events.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]
	const translatedLastEvents = translateOrderEvents(lastStatus?.status || "")

	const promoCode = order?.promoCode ? order.promoCode.code : null

	return (
		<div className="p-5 flex-grow z-[-1]">
			<div className="bg-box-color border border-border-color rounded-lg p-4 ">
				<div className="flex justify-between items-center">
					<div className="">
						<p className="text-sm text-text-color mb-1">Numer zamówienia</p>
						<span className="font-semibold text-xl">#{order.id}</span>
					</div>
					<div className={clsx(" px-3 py-1 rounded-full w-fit mt-1.5", translatedLastEvents.title === "Opłacone" ? "bg-primary-dark" : "bg-border-color")}>
						<p className={clsx(" text-sm", translatedLastEvents.title === "Opłacone" ? "text-primary-color" : "text-gray-400")}>{translatedLastEvents.title}</p>
					</div>
				</div>
				<div className="flex items-center gap-3 mt-5">
					<div className="bg-background p-4 border border-border-color rounded-lg flex-1">
						<p className="text-sm text-text-color/70 mb-1">Data zamówienia</p>
						<span
							className="font-semib
										old text-nowrap">
							{format(order.createdAt, "d MMMM yyyy", { locale: pl })}
						</span>
					</div>
					<div className="bg-background p-4 border border-border-color rounded-lg flex-1">
						<p className="text-sm text-text-color/70 mb-1">Liczba produktów</p>
						<span className="font-medium ">{order.products && order.products.length}</span>
					</div>
					<div className="bg-background p-4 border border-border-color rounded-lg flex-1">
						<p className="text-sm text-text-color/70 mb-1">Kod promocyjny</p>
						<span className={clsx("font-medium", promoCode && "text-primary-color uppercase")}>{promoCode || "Brak"}</span>
					</div>{" "}
				</div>
			</div>
			<div className="mt-7">
				<p className="text-lg font-semibold">Status zamówienia</p>
				<div className="relative">
					<div className="absolute top-0 left-[18px] w-[2px] h-full bg-border-color z-[-1]"></div>

					{sortedEventsOnDate &&
						sortedEventsOnDate
							.slice(0, visibleProducts)
							.reverse()
							.map(event => {
								const translatedEvents = translateOrderEvents(event.status)

								return (
									<div className="flex items-start gap-4 mt-4 z-10" key={event.id}>
										<div className={clsx("bg-border-color p-2.5 rounded-full", lastStatus?.id === event.id && "bg-primary-dark")}>
											<CircleCheckBig className="w-4.5 h-4.5 text-primary-color" />
										</div>
										<div className="flex items-start justify-between bg-box-color border border-border-color rounded-lg w-full p-4">
											<div className="">
												<p className="font-semibold">{translatedEvents.title}</p>
												<span className="text-sm text-text-color">{translatedEvents.description}</span>
											</div>
											<span className="text-sm text-text-color">{format(event.createdAt, "d MMM yyyy, HH:mm", { locale: pl })}</span>
										</div>
									</div>
								)
							})}
				</div>
				{sortedEventsOnDate && sortedEventsOnDate.length > 3 && (
					<Button className="w-full border border-border-color rounded-lg mt-5 text-text-color cursor-pointer font-medium" onPress={() => setVisibleProducts(visibleProducts === 3 ? sortedEventsOnDate.length : 3)}>
						{sortedEventsOnDate.length === visibleProducts ? `Pokaż mniej` : `Pokaż więcej (${sortedEventsOnDate.length - 3})`}
					</Button>
				)}
			</div>
			<div className="mt-7">
				<p className="text-lg font-semibold">Produkty</p>
				<div className="flex flex-col gap-4 mt-4">
					{order.products &&
						order.products.map(product => {
							const currentPrice = ((product.priceAfterDiscount || product.price) / 100).toFixed(2)
							const originalPrice = product.priceAfterDiscount && ((product.offer?.price || 0) / 100).toFixed(2)
							const refundedAmount = ((product.refundedAmount || 0) / 100).toFixed(2)

							return (
								<div className={clsx("flex justify-between items-center bg-box-color p-5 rounded-lg border border-border-color", product.refunded && "opacity-50")} key={product.id}>
									<div className="flex items-center gap-4">
										<div className="flex items-center justify-center bg-border-color w-14 h-14 rounded-lg">
											<Shield className={clsx(product.refunded ? "text-text-color" : "text-primary-color")} />
										</div>
										<div className="">
											<div className="flex items-center gap-2">
												<p className="font-semibold text-lg">{product.offer?.title}</p>
												{product.refunded && <span className="text-xs bg-border-color px-3 py-0.5 rounded-lg text-text-color">Zwrócono</span>}
											</div>
											<div className="flex items-center gap-3 mt-0.5">
												<span className="text-sm text-text-color">ID: {product.id}</span>
												<button className="cursor-pointer">
													<Copy className={clsx("w-4 h-4 text-primary-color", product.refunded && "text-text-color")} />
												</button>
											</div>
										</div>
									</div>
									<div className="flex flex-col text-center">
										{!product.refunded && <strong className="text-lg">{currentPrice} zł</strong>}
										{!product.refunded && originalPrice && <p className="text-sm line-through text-text-color">{originalPrice} zł</p>}

										{product.refunded && (originalPrice ? <p className="text-sm line-through text-text-color text-right">{originalPrice} zł</p> : <strong className="text-lg line-through text-right">{currentPrice} zł</strong>)}
										{product.refunded && <span className="text-sm">{refundedAmount} zł (75%)</span>}
									</div>
								</div>
							)
						})}
				</div>
			</div>
			<AccountOrderDetailsSummary order={order} />
		</div>
	)
}
