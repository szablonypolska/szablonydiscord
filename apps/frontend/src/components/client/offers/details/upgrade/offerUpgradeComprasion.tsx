"use client"

import { motion } from "framer-motion"
import { Users, Crown, Check, X } from "lucide-react"

export default function OfferUpgradeComparison() {
	const features = [
		{
			name: "Możliwość sprzedaży szablonów",
			free: false,
			premium: true,
		},

		{
			name: "Plakietka Premium na profilu",
			free: false,
			premium: true,
		},

		{
			name: "Wsparcie dla tworców",
			free: false,
			premium: true,
		},
		{
			name: "Zniżki na uslugi",
			free: false,
			premium: true,
		},
		{
			name: "Dostęp do szablonów",
			free: true,
			premium: true,
		},

		{
			name: "Limity zapytań API",
			free: true,
			premium: true,
			freeDescription: "100.000",
			premiumDescription: "650.000",
		},
		{
			name: "Dostęp do Buildera AI",
			free: true,
			premium: true,
			freeDescription: "3/dzień",
			premiumDescription: "10/dzień",
		},
		{
			name: "Zaawansowany podgląd szablonów",
			free: true,
			premium: true,
		},
	]

	return (
		<>
			<motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} viewport={{ once: true, amount: 0.7 }} className="flex flex-col items-center justify-center mt-32 ">
				<h2 className="text-2xl font-semibold text-center">Porównanie planów</h2>
				<p className="text-sm text-text-color text-center w-[40rem] max-md:w-11/12 mt-1">Sprawdź, co zyskujesz wybierając plan Premium i podnieś swoje doświadczenie na wyższy poziom</p>
			</motion.div>
			<div className="relative">
				<div className="absolute -left-20 top-0 bg-primary-color w-16 h-16 blur-[100px]  max-md:blur-[100px] max-md:left-1/2 z-[-1]"></div>
				<div className="absolute -right-20 bottom-0 bg-primary-color w-18 h-18 blur-[100px]  max-md:right-0 max-md:hidden z-[-1]"></div>
				<motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} viewport={{ once: true, amount: 0.3 }} className="mt-5 border border-border-color w-[70rem] rounded-2xl bg-box-color max-2xl:w-11/12">
					<div className="grid grid-cols-3  w-full ">
						<div className="max-sm:p-3 p-6 border-b border-r border-border-color">
							<p className="font-semibold">Funkcje</p>
						</div>
						<div className="flex flex-col items-center justify-center max-sm:p-3 p-6 border-r  border-b  border-border-color">
							<div className="bg-border-color p-3 rounded-full w-fit">
								<Users className="text-text-color w-4 h-4" />
							</div>
							<p className="font-semibold mt-1 max-sm:text-sm">Darmowy</p>
							<span className="text-text-color text-sm max-sm:text-xs">Plan podstawowy</span>
						</div>
						<div className="flex flex-col items-center justify-center max-sm:p-3 p-6 border-b border-border-color bg-primary-dark/10">
							<div className="bg-primary-dark/80 p-3 rounded-full w-fit">
								<Crown className="text-primary-color w-4 h-4" />
							</div>
							<p className="font-semibold text-primary-color mt-1 max-sm:text-sm">Premium</p>
							<span className="text-text-color text-sm  max-sm:text-xs">12,99 zl/miesiac</span>
						</div>
					</div>

					{features.map((feature, index) => (
						<div className="grid grid-cols-3" key={index}>
							<div className="border-r border-b border-border-color">
								<p className="max-sm:p-3 p-6 text-sm max-sm:text-xs">{feature.name}</p>
							</div>
							<div className="flex  justify-center max-sm:p-3 p-6 border-r border-b border-border-color">
								<div className="flex items-center gap-2">
									{feature.free ? <Check className="text-primary-color w-5 h-5" /> : <X className="text-error-color w-5 h-5" />}
									<p className="text-sm text-text-color">{feature.freeDescription}</p>
								</div>
							</div>
							<div className="flex  justify-center max-sm:p-3 p-6  border-b border-border-color bg-primary-dark/10">
								<div className="flex items-center gap-2">
									{feature.premium ? <Check className="text-primary-color w-5 h-5" /> : <X className="text-error-color w-5 h-5" />}
									<p className="text-sm text-text-color max-sm:text-xs">{feature.premiumDescription}</p>
								</div>
							</div>
						</div>
					))}
				</motion.div>
			</div>
		</>
	)
}
