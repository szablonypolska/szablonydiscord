import { motion } from "framer-motion"
import { Shield, Bot, Crown, Component } from "lucide-react"
import { OfferCategory } from "@/components/interfaces/offer/common"
import clsx from "clsx"

export default function OfferTopSidebar({ selectedOffer, setSelectedOffer }: { selectedOffer: OfferCategory | "ALL"; setSelectedOffer: (category: OfferCategory | "ALL") => void }) {
	const offers = [
		{
			id: "ALL",
			name: "Wszystkie",
		},
		{
			id: "PROTECTION",
			name: "Ochrona",
			icon: <Shield className="w-4 h-4" />,
		},
		{
			id: "BOT",
			name: "Bot",
			icon: <Bot className="w-4 h-4" />,
		},
		{
			id: "SUBSCRIPTION",
			name: "Subskrybcje",
			icon: <Crown className="w-4 h-4" />,
		},
		{
			id: "OTHER",
			name: "Inne",
			icon: <Component className="w-4 h-4" />,
		},
	]

	return (
		<motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-wrap items-center justify-center gap-3 mt-15 mb-10">
			{offers.map(offer => (
				<button className={clsx("flex items-center gap-2 bg-border-color px-5 py-2 rounded-full text-text-color cursor-pointer", offer.id === selectedOffer && "bg-primary-color text-white")} onClick={() => setSelectedOffer(offer.id as OfferCategory | "ALL")} key={offer.id}>
					{offer.icon}
					<span className="text-sm">{offer.name}</span>
				</button>
			))}
		</motion.div>
	)
}
