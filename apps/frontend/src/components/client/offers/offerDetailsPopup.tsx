import { Check, Clock, Shield, X, ShoppingCart } from "lucide-react"
import Image from "next/image"
import { Button } from "@nextui-org/button"
import { Offer } from "@/components/interfaces/offer/common"
import { AnimatePresence } from "framer-motion"
import { motion } from "framer-motion"

interface Props {
	offer: null | Offer
	setOffer: (offer: null | Offer) => void
	safeProductToCart: (id: string) => Promise<void>
}

export default function OfferDetailsPopup({ offer, setOffer, safeProductToCart }: Props) {
	return (
		<AnimatePresence>
			{offer && (
				<div key={offer.id} className="fixed inset-0 z-[100] flex items-center justify-center p-4">
					<motion.div onClick={() => setOffer(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 w-full h-full bg-black/80 z-[100] backdrop-blur-sm"></motion.div>
					<motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="flex flex-col fixed top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 inset-0  bg-box-color border border-border-color z-[110] h-full  md:max-h-[45rem] rounded-lg w-[70rem] max-xl:w-11/12 max-md:h-11/12 scrollbar scrollbar-thumb-alt-border-color scrollbar-track-border-color  overflow-y-auto">
						<div className="flex items-center justify-between p-6 border-b border-border-color">
							<div className="flex items-center gap-3">
								<Shield className="w-6 h-6 text-primary-color" />
								<h2 className="text-lg font-bold">Szczegóły oferty</h2>
							</div>
							<button className="cursor-pointer" onClick={() => setOffer(null)}>
								<X className="w-6 h-6" />
							</button>
						</div>
						<div className="flex max-md:flex-col flex-1">
							<div className="relative w-1/2 h-full max-md:w-full overflow-hidden max-md:min-h-52">
								{offer.recommended && (
									<div className="absolute -right-7 top-5 rotate-[50deg] bg-primary-color px-4 py-1 ">
										<p className="text-sm">POLECANY</p>
									</div>
								)}
								<div className="absolute inset-0 bg-gradient-to-t from-primary-color/2 to-transparent"></div>
								<Image src={offer.image} fill alt="Premium" className="object-cover h-full opacity-50" />
								<div className="absolute bottom-0 p-5">
									<div className=" bg-primary-dark/50 px-3 w-fit py-1 rounded-full mb-3">
										<p className="text-primary-color text-sm">Ochrona</p>
									</div>
									<p className="text-3xl font-bold mb-1 max-sm:text-2xl">{offer.title}</p>
									<span className="text-sm text-text-color">{offer.description}</span>
								</div>
							</div>
							<div className="flex flex-col justify-between w-1/2 p-8 bg-border-color/20 max-md:w-full max-sm:p-3">
								<div>
									<div className="flex items-center justify-between">
										<p className="text-2xl font-bold max-sm:text-xl">{offer.title}</p>
										<div className=" bg-primary-dark/50 px-3 w-fit py-1 rounded-full">
											<p className="text-primary-color text-sm max-sm:text-xs">Ochrona</p>
										</div>
									</div>
									<p className="text-text-color mt-3 max-sm:text-sm">{offer.description}</p>
									<div className="w-full bg-border-color/50 mt-5 rounded-lg p-4">
										<div className="flex items-center gap-2 ">
											<Check className="w-5 h-5 text-primary-color max-sm:w-4 max-sm:h-4" />
											<p className="font-semibold max-sm:text-sm">Co zawiera oferta:</p>
										</div>
										<ul className="mt-3 ml-2">
											{offer.benefits.map((el: string, index) => (
												<li className="flex items-start gap-3 mb-3" key={index}>
													<div className="bg-primary-dark/40 p-1 rounded-full w-fit">
														<Check className="w-4 h-4 text-primary-color max-sm:w-3 max-sm:h-3" />
													</div>
													<p className="text-sm max-sm:text-xs text-gray-200 mt-1">{el}</p>
												</li>
											))}
										</ul>
									</div>
								</div>
								<div className="mt-8">
									<div className="flex items-center justify-between">
										<div className="">
											<p className="text-sm text-text-color text-sm">Cena:</p>
											<span className="text-3xl font-bold max-sm:text-2xl">{(offer.price / 100).toFixed(2)} zł</span>
										</div>
										<div className="flex items-center gap-2 bg-border-color py-1 px-3 rounded-full w-fit ">
											<Clock className="text-primary-color w-4 h-4" />
											<p className="text-xs">Natychmiastowa realizacja</p>
										</div>
									</div>
									<Button className="w-full bg-primary-color mt-5 rounded-lg py-6 cursor-pointer" onPress={() => safeProductToCart(offer.id)}>
										<ShoppingCart className="w-5 h-5" />
										<p>Dodaj do koszyka</p>
									</Button>
								</div>
							</div>
						</div>
						<div className="flex items-center gap-3 p-6 bg-box-color border-t border-border-color">
							<div className="bg-primary-dark p-2 rounded-lg w-fit">
								<Shield className="w-5 h-5 text-primary-color" />
							</div>
							<div className="">
								<p className="font-bold text-sm">Gwarancja otrzymania produktu</p>
								<span className="text-sm text-text-color">Wszystkie nasze produkty są objęte gwarancją. W razie problemów skontaktuj się z naszym zespolem wsparcia.</span>
							</div>
						</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	)
}
