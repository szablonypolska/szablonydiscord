"use client"

import { CircleCheckBig } from "lucide-react"
import { motion } from "framer-motion"

export default function SuccessOrderHeader() {
	return (
		<motion.header initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex flex-col items-center">
			<div className="bg-primary-color p-4.5 rounded-full w-fit">
				<CircleCheckBig className="w-9.5 h-9.5" />
			</div>
			<h1 className="text-4xl font-bold mt-5">Dziękujemy za zakup!</h1>
			<p className="text-lg mt-2 text-text-color">Twoje zamówienie zostało pomyślnie zrealizowane.</p>
		</motion.header>
	)
}
