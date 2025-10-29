"use client"

import { motion } from "framer-motion"
import { CloudLightning, Bot } from "lucide-react"

export default function MainContentBox() {
	return (
		<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }} className="flex items-center gap-3 w-180 max-md:w-11/12 max-md:flex-col mt-5 z-10">
			<div className="grow bg-box-color border border-border-color p-3 py-5 rounded-lg max-md:w-full">
				<div className="bg-border-color p-2.5 rounded-lg w-fit">
					<CloudLightning className="text-primary-color" />
				</div>
				<div className="mt-2">
					<p className="font-medium">Szybka generacja</p>
					<span className="text-text-color text-sm mt-0.5">Gotowy szablon w pare minut!</span>
				</div>
			</div>
			<div className="grow bg-box-color border border-border-color p-3 py-5 rounded-lg max-md:w-full">
				<div className="bg-border-color p-2.5 rounded-lg w-fit">
					<Bot className="text-primary-color" />
				</div>
				<div className="mt-2">
					<p className="font-medium">AI asystent</p>
					<span className="text-text-color text-sm mt-0.5">Pomoc w konfiguracji serwera</span>
				</div>
			</div>
			<div className="grow bg-box-color border border-border-color p-3 py-5 rounded-lg max-md:w-full">
				<div className="bg-border-color p-2.5 rounded-lg w-fit">
					<CloudLightning className="text-primary-color" />
				</div>
				<div className="mt-2">
					<p className="font-medium">Szybka generacja</p>
					<span className="text-text-color text-sm mt-0.5">Gotowy szablon w pare minut!</span>
				</div>
			</div>
		</motion.div>
	)
}
