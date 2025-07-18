"use client"
import { Button } from "@nextui-org/button"
import { motion } from "framer-motion"
import { ArrowRight, Check, Lock, Shield } from "lucide-react"
import Link from "next/link"

export default function OfferList() {
	const packages = [
		{
			id: 1,
			icon: Shield,
			price: 5.5,
			title: "Podstawowa ochrona",
			description: "Dla pojedynczych serwerów",
			features: ["Usunięcie szablonów ze strony", "Potwierdzenie email", "Natychmiastowa realizacja"],
			popular: false,
			label: "popularny",
			link: "/offers/basic",
		},
		{
			id: 2,
			icon: Shield,
			price: 20.5,
			title: "Zaawansowana ochrona",
			description: "Brak możliwości dodania serwera",
			features: ["Usunięcie szablonów ze strony", "Blokada klonowania na shizeclone.eu", "Blokada po ID serwera", "Potwierdzenie email", "Natychmiastowa realizacja"],
			popular: true,
			label: "polecany",
			link: "/offers/basic",
		},
		{
			id: 3,
			icon: Shield,
			price: 12.5,
			title: "Premium ochrona",
			description: "Średnia możliwość dodania serwera",
			features: ["Usunięcie szablonów ze strony", "Blokada po nazwie serwera", "Potwierdzenie email", "Natychmiastowa realizacja"],
			popular: false,
			label: "premium",
			link: "/offers/premium",
		},
	]

	return (
		<div className="flex flex-col items-center justify-center my-20">
			<motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col items-center gap-2 justify-center">
				<div className="flex items-center gap-2 bg-primary-dark/30  border border-primary-dark text-primary-color p-1.5 px-5 rounded-full w-fit">
					<Shield className="text-primary-color w-5 h-5" />
					<p className="font-medium text-sm">Wybierz pakiet ochrony</p>
				</div>
				<div className="mt-5 text-center">
					<h1 className="text-3xl font-semibold">Zabezpiecz swój serwer Discord</h1>
					<p className="text-text-color mt-3 w-200 max-md:w-11/12">Wybierz poziom ochrony, który najlepiej odpowiada Twoim potrzebom. Każdy pakiet zawiera różne metody weryfikacji i czasy realizacji.</p>
				</div>
			</motion.div>
			<div className="flex items-center gap-5 mt-14 max-lg:grid max-lg:grid-cols-2 max-md:grid-cols-1">
				{packages.map(el => (
					<motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 50, demping: 10, delay: el.id * 0.15 }} className={`flex flex-col  h-124 border xl:w-96 max-xl:grow  p-8 rounded-2xl relative ${el.popular ? "border-primary-color" : "border-border-color "}`} key={el.id}>
						<div className={`absolute -top-4 left-1/2 -translate-x-1/2  px-5 rounded-full py-1.5 w-fit ${el.popular ? "bg-primary-color" : "bg-border-color"}`}>
							<p className="uppercase text-sm">{el.label}</p>
						</div>
						<div className="flex items-center gap-3 mt-2">
							<div className={`flex items-center justify-center w-14 h-14 rounded-xl ${el.popular ? "bg-primary-color" : "bg-border-color"}`}>
								<el.icon />
							</div>
							<div className="">
								<p className="text-xl font-semibold">{el.title}</p>
								<span className="text-sm text-text-color">{el.description}</span>
							</div>
						</div>
						<div className="flex items-center justify-center bg-border-color h-16 rounded-lg mt-5">
							<p className="text-3xl font-semibold">
								{el.price} zł<span className="text-sm font-normal text-text-color">/serwer</span>
							</p>
						</div>
						<div className="mt-8">
							<ul>
								{el.features.map((features, index) => (
									<li className="flex items-center gap-2 text-sm mb-2 text-gray-200" key={index}>
										<Check className="w-5 h-5 text-primary-color" /> {features}
									</li>
								))}
							</ul>
						</div>
						<div className="grow"></div>
						{!el.popular && (
							<Link href={el.link} className="w-full ">
								<Button className="bg-border-color h-14 w-full rounded-xl cursor-pointer">
									<span>Wybierz pakiet</span>
									<ArrowRight className="w-5 h-5" />
								</Button>
							</Link>
						)}
						{el.popular && (
							<Link href={el.link} className="w-full">
								<Button className="bg-primary-color h-14 w-full rounded-xl cursor-pointer">
									<Lock className="w-5 h-5" />
									<span>Wybierz pakiet</span>
								</Button>
							</Link>
						)}
					</motion.div>
				))}
			</div>
			<p className="mt-5 text-sm text-text-color">*Niniejsza oferta stanowi współprace ze shizeclone.eu</p>
		</div>
	)
}
