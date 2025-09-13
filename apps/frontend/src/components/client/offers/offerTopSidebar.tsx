"use client"

import { motion } from "framer-motion"
import { Shield, Bot, Crown, Component } from "lucide-react"

export default function OfferTopSidebar() {
	return (
		<motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-wrap items-center justify-center gap-3 mt-15 mb-10">
			<button className="flex items-center gap-2 bg-primary-color px-5 py-2 rounded-full text-sm">Wszystkie</button>
			<button className="flex items-center gap-2 bg-border-color px-5 py-2 rounded-full text-text-color">
				<Shield className="w-4 h-4" />
				<span className="text-sm">Ochrona</span>
			</button>
			<button className="flex items-center gap-2 bg-border-color px-5 py-2 rounded-full text-text-color">
				<Bot className="w-4 h-4" />
				<span className="text-sm">Bot</span>
			</button>
			<button className="flex items-center gap-2 bg-border-color px-5 py-2 rounded-full text-text-color">
				<Crown className="w-4 h-4" />
				<span className="text-sm">Subskrybcje</span>
			</button>
			<button className="flex items-center gap-2 bg-border-color px-5 py-2 rounded-full text-text-color">
				<Component className="w-4 h-4" />
				<span className="text-sm">Inne</span>
			</button>
		</motion.div>
	)
}
