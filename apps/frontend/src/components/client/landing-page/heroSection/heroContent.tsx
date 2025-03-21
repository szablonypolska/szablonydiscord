"use client"

import { Button } from "@nextui-org/button"
import { BadgeCheck } from "lucide-react"

export default function HeroContent() {
	return (
		<>
			<div className="max-md:flex max-md:flex-col max-md:items-center max-md:text-center mb-10 max-md:w-full max-lg:w-1/2">
				<div className="flex items-center gap-2 bg-borderColor w-fit px-2 py-1 rounded-full">
					<BadgeCheck className="text-primaryColor w-5 h-5" />
					<p className="text-gray-300">Szablonydiscord jest w pełni bezpłatne</p>
				</div>
				<h2 className="text-4xl font-medium tracking-wide mt-5 max-md:text-2xl max-md:font-semibold max-lg:text-3xl">Witaj w SzablonyDiscord</h2>
				<h3 className="text-4xl font-medium tracking-wide max-md:mt-2 mt-5 max-md:text-2xl max-md:text-wrap max-lg:text-3xl">
					Zobacz jak wykorzystujemy <strong className="text-primaryColor font-semibold">swoje</strong>
				</h3>
				<h3 className="text-4xl tracking-wide mt-5 text-primaryColor font-semibold max-md:text-2xl max-md:mt-1 max-lg:text-3xl">zaawansowane systemy!</h3>
				<p className="my-7 w-[45rem] text-sm text-textColor max-xl:w-[35rem] max-md:text-xs max-lg:w-full max-md:my-4">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia necessitatibus, pariatur ratione minus pariatur eos fugiat voluptates sit voluptate dolor quisquam accusantium. Ut aspernatur
					Lorem ipsum dolor sit amet. incidunt ducimus dolore.
				</p>
				<Button className=" bg-primaryColor px-5 py-2.5 rounded-full">Zacznij przeglądać</Button>
			</div>
		</>
	)
}
