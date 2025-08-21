"use client"

import { Button } from "@nextui-org/button"
import { ShoppingCart, X, Shield, Trash2, SquareArrowOutUpRight, } from "lucide-react"
import ShoppingCartDiscountCode from "./ShoppingCartDiscountCode"

export default function BasketPopup() {
	return (
		<>
			<div className="fixed top-0 left-0 w-full h-full bg-black/50 z-[120]"></div>
			<div className="absolute top-1/2 left-1/2 -translate-1/2 bg-alt-background-color border border-border-color px-5 py-6 rounded-lg z-[130] w-[35rem] max-md:w-11/12">
				<div className="flex justify-between items-center">
					<div className="flex items-center  gap-3">
						<ShoppingCart className="w-5 h-5 font-semibold" />
						<p className="font-medium text-lg">Koszyk (0 przedmiotów)</p>
					</div>
					<button className="text-text-color p-2 hover:bg-text-color/10 rounded-lg cursor-pointer">
						<X className="w-4 h-4" />
					</button>
				</div>
				<div className="">
					<div className="flex items-center justify-between bg-border-color w-full p-3 rounded-lg mt-3">
						<div className="flex items-center gap-3">
							<div className="bg-primary-color p-3 py-3 rounded-lg w-fit">
								<Shield className="w-7 h-7" />
							</div>
							<div className="flex flex-col">
								<p className="text-sm font-medium">Podstawowa ochrona</p>

								<span className="text-xs text-text-color">20.00 zł × 10 in stock</span>
							</div>
						</div>
						<div className="flex items-center gap-5 mr-5">
							<p className="font-semibold text-sm">20.00 zł</p>
							<button>
								<Trash2 className="w-5 h-5 text-text-color" />
							</button>
						</div>
					</div>
					<div className="flex items-center justify-between bg-border-color w-full p-3 rounded-lg mt-3">
						<div className="flex items-center gap-3">
							<div className="bg-primary-color p-3 py-3 rounded-lg w-fit">
								<Shield className="w-7 h-7" />
							</div>
							<div className="flex flex-col">
								<p className="text-sm font-medium">Podstawowa ochrona</p>

								<span className="text-xs text-text-color">20.00 zł × 10 in stock</span>
							</div>
						</div>
						<div className="flex items-center gap-5 mr-5">
							<p className="font-semibold text-sm">20.00 zł</p>
							<button>
								<Trash2 className="w-5 h-5 text-text-color" />
							</button>
						</div>
					</div>
				</div>
				<div className="mt-5">
					<div className="w-full h-[2px] bg-border-color"></div>
					<div className=" my-5">
						<ShoppingCartDiscountCode />
					</div>
					<div className="w-full h-[2px] bg-border-color"></div>
				</div>
				<div className="mt-5">
					<div className="flex items-center justify-between">
						<div className="">
							<p className="text-text-color text-sm">Całość (0 przedmiot)</p>
							<p className="font-bold text-xl">25.15 zł</p>
						</div>
						<div className="">
							<Button className="border border-primary-color text-primary-color rounded-lg text-sm">
								<Trash2 className="w-4 h-4" /> Resetuj koszyk
							</Button>
						</div>
					</div>
				</div>
				<Button className="gap-3 bg-primary-color w-full rounded-lg mt-6">
					<SquareArrowOutUpRight className="w-5 h-5" />
					<p>Przejdź do kasy</p>
				</Button>
				<p className="text-xs text-text-color text-center mt-3">Płatności są obslugiwane przez operatora stripe</p>
			</div>
		</>
	)
}
