"use client"
import { useCartContext } from "@/context/CartContext"
import addToCart from "@/lib/cart/addCart"
import { motion } from "framer-motion"
import { ArrowRight, Check, Eye, Loader2, ShoppingCart } from "lucide-react"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import Image from "next/image"
import OfferDetailsPopup from "./offerDetailsPopup"
import { Offer } from "@/components/interfaces/offer/common"
import { useState } from "react"
import { translateCategoryOffer } from "@/utils/translateCategoryOffer"
import OfferTopSidebar from "./offerTopSidebar"
import { OfferCategory } from "@/components/interfaces/offer/common"
import clsx from "clsx"

export default function OfferList({ offers }: { offers: Offer[] }) {
	const { data: session } = useSession()
	const { setCart, cart } = useCartContext()
	const [offer, setOffer] = useState<null | Offer>(null)
	const [loader, setLoader] = useState<{ load: boolean; id: string }>({ load: false, id: "" })
	const [selectedOffer, setSelectedOffer] = useState<OfferCategory | "ALL">("ALL")

	const safeProductToCart = async (id: string) => {
		try {
			setLoader({ load: true, id })
			const data = await addToCart(id, session?.user?.id || "")

			if (data.code === "ITEM_ALREADY_IN_CART") {
				toast.warning("Produkt jest już w koszyku", {
					description: "Dodaj inny produkt lub przejdź do koszyka",
				})
				setLoader({ load: false, id: "" })
				return
			}

			if (data.ok) {
				setCart(prev => (prev ? [...prev, data.offer] : [data.offer]))
				toast.success("Produkt został dodany do koszyka", {
					description: "Przejdź do koszyka, aby sfinalizować zamówienie",
				})
			}
			setLoader({ load: false, id: "" })
		} catch (err) {
			console.log(err)
			toast.error("Wystąpił błąd podczas dodawania produktu do koszyka")
			setLoader({ load: false, id: "" })
		}
	}

	return (
		<>
			<OfferTopSidebar selectedOffer={selectedOffer} setSelectedOffer={setSelectedOffer} />
			<div className="mt-10">
				<OfferDetailsPopup offer={offer} setOffer={setOffer} safeProductToCart={safeProductToCart} />
				<div className="grid grid-cols-3 gap-7 px-5 max-lg:grid-cols-2 max-sm:grid-cols-1 max-sm:px-3 max-xl:px-0">
					{offers &&
						offers.map((offer, index) => {
							const visible = selectedOffer === "ALL" || offer.category === selectedOffer
							const checkIsInCart = cart?.some(item => item === offer.id)
							return (
								<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 100, damping: 12, delay: index * 0.2 }} className={clsx("bg-box-color border rounded-lg border-border-color", offer.recommended && "border-primary-color", !visible && "hidden")} key={offer.id}>
									<div className="relative overflow-hidden">
										<div className="absolute inset-0 bg-gradient-to-b from-[#00796b]/0 via-[#00796b]/0 to-[#1a1a1a] opacity-50 z-10"></div>
										<div className="absolute inset-0 bg-black/10 w-ful h-full"></div>
										{offer.recommended && (
											<div className="absolute -right-7 top-5 rotate-[50deg] bg-primary-color px-4 py-1 ">
												<p className="text-sm">POLECANY</p>
											</div>
										)}
										<div className="flex items-center justify-between w-full absolute top-4 px-4  overflow-hidden">
											<div className=" bg-primary-dark/50 px-3 w-fit py-1 rounded-full">
												<p className="text-primary-color text-xs">{translateCategoryOffer(offer.category)}</p>
											</div>
											{!offer.recommended && (
												<div className="bg-border-color px-3 w-fit py-1 rounded-full">
													<p className="font-medium text-xs">Płatne</p>
												</div>
											)}
										</div>
										<Image src={offer.image} alt="Premium" className="rounded-t-lg h-62 " width={500} height={400} />
									</div>

									<div className="px-5 py-4">
										<div>
											<h2 className="text-lg font-bold">{offer.title}</h2>
											<p className="text-sm text-text-color mt-2 line-clamp-2">{offer.description}</p>
										</div>
										<div className="bg-border-color w-full h-[1px] mt-4"></div>
										<div className="mt-4">
											<div className="flex items-center justify-between">
												<div className="">
													<p className="text-sm text-text-color">Cena</p>
													<p className="text-2xl font-bold">{(offer.price / 100).toFixed(2)} zł</p>
												</div>
												<div className="flex items-center gap-2">
													<button className="bg-border-color rounded-lg py-2 px-2.5 cursor-pointer h-10 " onClick={() => setOffer(offer)}>
														<Eye className="w-5" />
													</button>
													<button className="flex items-center gap-0.5 bg-primary-color py-2 px-3 rounded-lg cursor-pointer h-10 disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => safeProductToCart(offer.id)} disabled={loader.load || checkIsInCart}>
														{loader.load && loader.id === offer.id ? <Loader2 className="w-6 h-6 animate-spin" /> : <ShoppingCart className="w-5" />}
														{loader.id !== offer.id && <span className="ml-2">Kup</span>}
													</button>
												</div>
											</div>
											<div className="flex flex-col gap-2 mt-3">
												<div className="flex items-center gap-2">
													<Check className="text-primary-color w-4.5 h-4.5" />
													<p className="text-sm text-text-color">{offer.benefits[0] || "Brak opisu"}</p>
												</div>
												<div className="flex items-center gap-2">
													<Check className="text-primary-color w-4.5 h-4.5" />
													<p className="text-sm text-text-color">{offer.benefits[1] || "Brak opisu"}</p>
												</div>
												<div className="flex items-center gap-2 text-primary-color group">
													<p className="text-sm">+{offer.benefits.length - 2} więcej funkcji </p>
													<ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
												</div>
											</div>
										</div>
									</div>
								</motion.div>
							)
						})}
				</div>
			</div>
		</>
	)
}
