import { Package, Calendar, Clock, ChevronRight, Shield } from "lucide-react"
// import AccountOrderDetailsOrder from "./AccountOrderDetailsOrder"
import { Order } from "@/components/interfaces/order/common"
import { format } from "date-fns/format"
import { pl } from "date-fns/locale"
import { translateOrderEvents } from "@/utils/translateOrderEvents"
import clsx from "clsx"

export default function AccountOrderBox({ order }: { order: Order[] }) {
	return (
		<>
			{/* <AccountOrderDetailsOrder /> */}
			<div className="flex flex-col gap-5 p-5">
				{order.map(orderItem => {
					const lastStatus = orderItem.events && orderItem.events.sort((a, b) => new Date(b.dateCreate).getTime() - new Date(a.dateCreate).getTime())[0]
					const translatedEvents = translateOrderEvents(lastStatus?.status || "")
					const priceAllProducts = orderItem.products?.reduce((acc, product) => {
						const productPrice = product.priceAfterDiscount || product.price

						return (acc += productPrice)
					}, 0)
					const formatedPrice = ((priceAllProducts || 0) / 100).toFixed(2)

					return (
						<div className="bg-background p-5 py-7 rounded-lg border border-border-color" key={orderItem.id}>
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="flex items-center justify-center bg-border-color h-12 w-12 rounded-lg">
										<Package className="text-primary-color w-6  h-6" />
									</div>
									<div className="">
										<p className="font-semibold">Zamówienie #{orderItem.id}</p>
										<div className="flex items-center gap-3 mt-1">
											<div className="flex items-center gap-1.5">
												<Calendar className="text-primary-color w-3.5 h-3.5" />
												<span className="text-sm text-text-color/80">{format(orderItem.dateCreate, "d MMMM yyyy", { locale: pl })}</span>
											</div>
											<div className="flex items-center gap-1.5">
												<Package className="text-primary-color w-3.5 h-3.5" />
												<span className="text-sm text-text-color/80">{orderItem.products?.length} produkty</span>
											</div>
											<div className="flex items-center gap-1.5  text-text-color/80">
												<Clock className=" w-3.5 h-3.5" />
												<span className="text-sm">{translatedEvents}</span>
											</div>
										</div>
									</div>
								</div>
								<div className="flex items-center gap-2">
									<div className="text-center">
										<p className="text-xl font-semibold">{formatedPrice} zł</p>
										<div className={clsx(" px-3 py-1 rounded-full w-fit mt-1.5", translatedEvents === "Opłacone" ? "bg-primary-dark" : "bg-border-color")}>
											<p className={clsx(" text-sm", translatedEvents === "Opłacone" ? "text-primary-color" : "text-gray-400")}>{translatedEvents}</p>
										</div>
									</div>
									<ChevronRight className="text-primary-color w-7 h-7" />
								</div>
							</div>
							<div className="flex items-center gap-4 mt-4 ">
								{orderItem.products &&
									orderItem.products.slice(0, 3).map(product => {
										const productPrice = ((product.priceAfterDiscount || product.price) / 100).toFixed(2)

										return (
											<div className="flex items-center gap-3 bg-box-color border border-border-color p-3 rounded-lg w-96" key={product.id}>
												<div className="bg-border-color p-3 rounded-lg">
													<Shield className="text-primary-color" />
												</div>
												<div className="flex flex-col">
													<p className="font-medium">{product.offer?.title}</p>
													<span className="text-sm text-text-color">{productPrice} zł</span>
												</div>
											</div>
										)
									})}
							</div>
						</div>
					)
				})}
			</div>
		</>
	)
}
