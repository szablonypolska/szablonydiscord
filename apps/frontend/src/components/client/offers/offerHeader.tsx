"use client"

import { Shield } from "lucide-react"
import Image from "next/image"
import DiscordLogo from "../../../../public/discordUserAvatar.jpg"
import { motion } from "framer-motion"

export default function OfferHeader() {
	return (
		<div className="relative flex flex-col items-center mt-20">
			<div className="absolute -left-10 top-32 bg-primary-color w-14 h-14 blur-[80px]  max-md:blur-[100px] max-md:left-1/2 z-10"></div>

			<div className="absolute right-10 top-32 bg-advice-bot w-14 h-14 blur-[80px]  max-md:blur-[100px] max-md:left-1/2 z-10"></div>

			<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 100, damping: 12 }} className="flex items-center gap-2 bg-primary-dark/30  border border-primary-dark text-primary-color p-1.5 px-5 rounded-full w-fit">
				<Shield className="text-primary-color w-5 h-5" />
				<p className="font-medium text-sm">Wybierz pakiet ochrony</p>
			</motion.div>
			<div className="flex flex-col items-center justify-center mt-5">
				<motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 100, damping: 12, delay: 0.1 }} className="text-5xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-text-color text-center max-md:text-3xl max-sm:text-2xl">
					Znajdz idealne <span className="bg-clip-text bg-gradient-to-r from-primary-color to-primary-light">rozwiązanie</span> dla <br /> Twojego serwera
				</motion.h1>
				<motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 100, damping: 12, delay: 0.2 }} className="text-text-color w-[40rem] text-center mt-6 max-md:text-sm max-md:w-11/12">
					Odkryj naszą kolekcję premium szablonów, narzędzi ochrony i zaawansowanych rozwiązań, które wyniosą Twój serwer Discord na nowy poziom
				</motion.p>
			</div>
			<div className="flex items-center gap-3 mt-8 max-sm:flex-col max-sm:justify-center">
				<div className="flex items-center relative">
					<motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 100, damping: 12, delay: 0.3 }}>
						<Image src={DiscordLogo} alt="Discord Logo" className="w-10 h-10 rounded-full outline-2 outline-border-color max-md:w-8 max-md:h-8" />
					</motion.div>
					<motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 100, damping: 12, delay: 0.35 }} className="absolute left-7  w-10 h-10  max-md:w-8 max-md:h-8">
						<Image src={DiscordLogo} alt="Discord Logo" className="rounded-full outline-2 outline-border-color" />
					</motion.div>
					<motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 100, damping: 12, delay: 0.4 }} className="absolute left-14  w-10 h-10  max-md:w-8 max-md:h-8">
						<Image src={DiscordLogo} alt="Discord Logo" className="rounded-full outline-2 outline-border-color" />
					</motion.div>
				</div>
				<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="ml-14 text-sm text-text-color max-sm:ml-0 ">
					Dołącz do <span className="text-white font-semibold">2000+</span> zadowolonych użytkowników
				</motion.p>
			</div>
		</div>
	)
}
