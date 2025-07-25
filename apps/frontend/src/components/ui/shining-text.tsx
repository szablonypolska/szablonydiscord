"use client"

import * as React from "react"

import { motion } from "motion/react"

export function ShiningText({ text }: { text: string }) {
	return (
		<motion.span
			className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-size-[200%_100%] bg-clip-text font-medium text-sm text-transparent"
			initial={{ backgroundPosition: "200% 0" }}
			animate={{ backgroundPosition: "-200% 0" }}
			transition={{
				repeat: Infinity,
				duration: 2,
				ease: "linear",
			}}>
			{text}
		</motion.span>
	)
}
