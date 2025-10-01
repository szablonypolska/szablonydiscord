"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function SuccessOrderHelp() {
	return (
		<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.9 }} className="flex items-center justify-center gap-5 w-full mt-8 z-10">
			<p className="text-sm text-text-color">
				Masz pytania?{" "}
				<Link href="/contact" className="text-primary-color hover:underline">
					Skontaktuj się z naszym wsparciem
				</Link>
			</p>
		</motion.div>
	)
}
