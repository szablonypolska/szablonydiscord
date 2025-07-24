"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export default function MainContentHeader() {
	return (
		<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col items-center ">
			<div className="absolute -right-32 top-96 bg-primary-color w-28 h-28 blur-[100px] animate-pulse max-md:right-0 max-md:hidden z-10"></div>
			<div className="flex items-center gap-3 bg-box-color border border-border-color p-1.5 px-5 rounded-full w-fit">
				<Sparkles className="text-primary-color w-5 h-5" />
				<p className="font-medium text-sm">Powered by AI</p>
			</div>
			<div className="w-140 max-md:w-full text-center mt-5">
				<h1 className="text-3xl font-semibold tracking-wider">Stwórz idealny szablon Discord</h1>
				<p className="text-text-color mt-2.5 text-sm">Opisz swój wymarzony serwer discord a nasza sztuczna inteligencja stworzy dla ciebie szablon discord.</p>
			</div>
		</motion.div>
	)
}
