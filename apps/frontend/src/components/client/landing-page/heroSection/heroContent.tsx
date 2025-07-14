"use client"

import { Button } from "@nextui-org/button"
import { BadgeCheck } from "lucide-react"
import { motion } from "framer-motion"

export default function HeroContent() {
	return (
		<>
			<motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="max-md:flex max-md:flex-col max-md:items-center max-md:text-center mb-10 max-md:w-full max-lg:w-1/2">
				<div className="flex items-center gap-2 bg-border-color w-fit px-2 py-1 rounded-full">
					<BadgeCheck className="text-primary-color w-5 h-5 max-md:w-4 max-md:h-4" />
					<p className="text-gray-300 max-md:text-sm">Szablonydiscord jest w pełni bezpłatne</p>
				</div>
				<h2 className="text-4xl font-medium tracking-wide mt-5 max-md:text-2xl max-md:font-semibold max-lg:text-3xl">Witaj w SzablonyDiscord</h2>
				<h3 className="text-4xl font-medium tracking-wide max-md:mt-2 mt-5 max-md:text-2xl max-md:text-wrap max-lg:text-3xl">
					gdzie twój serwer discord <span className="font-semibold text-primary-color">nabierze</span>
				</h3>
				<h3 className="text-4xl tracking-wide mt-5 text-primary-color font-semibold max-md:text-2xl max-md:mt-1 max-lg:text-3xl">nowoczesnego wyglądu!</h3>
				<p className="my-7 w-180 text-sm text-text-color max-xl:w-140 max-md:text-xs max-lg:w-full max-md:my-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia necessitatibus, pariatur ratione minus pariatur eos fugiat voluptates sit voluptate dolor quisquam accusantium. Ut aspernatur Lorem ipsum dolor sit amet. incidunt ducimus dolore.</p>
				<Button className=" bg-primary-color px-5 py-2.5 rounded-full">Zacznij przeglądać</Button>
			</motion.div>
		</>
	)
}
