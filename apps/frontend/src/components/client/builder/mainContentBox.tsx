"use client"

import { motion } from "framer-motion"
import { CloudLightning, Bot } from "lucide-react"

export default function MainContentBox() {
	return (
		<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.3 }} className="flex items-center gap-3 w-[45rem] max-md:w-11/12 max-md:flex-col mt-5 z-10">
			<div className="flex-grow bg-boxColor border border-borderColor p-3 py-5 rounded-lg max-md:w-full">
				<div className="bg-borderColor p-2.5 rounded-lg w-fit">
					<CloudLightning className="text-primaryColor" />
				</div>
				<div className="mt-2">
					<p className="font-medium">Szybka generacja</p>
					<span className="text-textColor text-sm mt-0.5">Gotowy szablon w pare minut!</span>
				</div>
			</div>
			<div className="flex-grow bg-boxColor border border-borderColor p-3 py-5 rounded-lg max-md:w-full">
				<div className="bg-borderColor p-2.5 rounded-lg w-fit">
					<Bot className="text-primaryColor" />
				</div>
				<div className="mt-2">
					<p className="font-medium">AI asystent</p>
					<span className="text-textColor text-sm mt-0.5">Pomoc w konfiguracji serwera</span>
				</div>
			</div>
			<div className="flex-grow bg-boxColor border border-borderColor p-3 py-5 rounded-lg max-md:w-full">
				<div className="bg-borderColor p-2.5 rounded-lg w-fit">
					<CloudLightning className="text-primaryColor" />
				</div>
				<div className="mt-2">
					<p className="font-medium">Szybka generacja</p>
					<span className="text-textColor text-sm mt-0.5">Gotowy szablon w pare minut!</span>
				</div>
			</div>
		</motion.div>
	)
}
