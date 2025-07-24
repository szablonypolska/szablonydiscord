"use client"

import { motion } from "framer-motion"
import { Button } from "@nextui-org/button"
import { DiscordTemplate, BaseInforamtion } from "../../../interfaces/templates/common"
import TemplatesVisuzalization from "./templatesVisualizaton"
import Link from "next/link"
import { Roles } from "@/components/interfaces/templates/common"
import { Download, Eye, Plus, Bot, Volume2, Users } from "lucide-react"
import { Tooltip } from "@heroui/react"
import { TemplatesUserCreator } from "./templatesCreator"
import TemplatesPopup from "./templatesPopup"
import { useState } from "react"



interface Props {
	data: DiscordTemplate
	base: BaseInforamtion
}

export default function TemplatesDetails({ data, base }: Props) {
	const [popup, setPopup] = useState<boolean>(false)

	const numbers = data.serialized_source_guild.channels.reduce(
		(acc, value) => {
			if (value.type === 0) acc.channels++
			if (value.type === 2) acc.voice++
			return acc
		},
		{ channels: 0, voice: 0 }
	)
	const { channels, roles } = data.serialized_source_guild

	const filtredRoles: Roles[] = roles.map(el => ({
		name: el.name,
		color: el.color,
		id: el.id,
	}))

	const containerVariants = {
		hidden: { opacity: 0, y: 50 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
	}

	return (
		<>
			<TemplatesPopup link={base.link} popup={popup} setPopup={setPopup} />
			<motion.main className="flex flex-col items-center my-32" initial="hidden" animate="visible" variants={containerVariants}>
				<motion.section className="bg-alt-background-color w-280 max-xl:w-11/12 p-8 rounded-xl border border-border-color max-lg:p-5" variants={containerVariants}>
					<header>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-4 w-full">
								<h1 className="text-2xl max-w-120 truncate max-lg:max-w-96">{base.title}</h1>
								<div className="flex gap-1 max-sm:hidden">
									<span className="px-4 py-1 bg-border-color w-fit text-sm rounded-full">{base.categories}</span>
								</div>
							</div>
							<div className="flex items-center gap-2">
								<Tooltip content="Odsłony szablonu" className="p-1 px-3 bg-border-color rounded-xl" delay={300}>
									<div className="flex items-center gap-1 px-3 py-1 bg-border-color w-fit rounded-xl max-md:hidden">
										<Eye className="font-black" />
										<p className="text-2xl ml-0.2">{base.historyLength}</p>
									</div>
								</Tooltip>
								<Tooltip content="Użycia szablonu" className="p-1 px-3 bg-border-color rounded-xl" delay={300}>
									<div className="flex items-center gap-1 px-3 py-1 bg-border-color w-fit rounded-xl max-md:hidden">
										<Download />
										<p className="text-2xl ml-0.2">{data.usage_count}</p>
									</div>
								</Tooltip>
							</div>
						</div>
						<p className="text-text-color text-lg md:w-9/12 max-md:w-full">{base.description}</p>
						<div className="max-sm:flex hidden mt-3 gap-2">
							<span className="px-4 py-1 bg-border-color  text-sm rounded-full w-full  text-center">{base.categories}</span>
						</div>
					</header>

					<section className="flex items-center gap-2 mt-5 max-sm:flex-col">
						<TemplatesUserCreator avatar={data.creator.avatar} username={data.creator.username} id={data.creator.id} />
						<div className="flex gap-2 max-sm:mt-2 max-sm:w-full">
							<Tooltip content="Kanały tekstowe" className="p-1 px-3 bg-border-color rounded-xl" delay={300}>
								<div className="flex items-center gap-1 px-3 h-12 bg-border-color w-fit rounded-xl max-sm:grow max-sm:justify-center">
									<span className="text-2xl">#</span>
									<p className="text-xl">{numbers.channels}</p>
								</div>
							</Tooltip>
							<Tooltip content="Kanały głosowe" className="p-1 px-3 bg-border-color rounded-xl" delay={300}>
								<div className="flex items-center gap-1 px-3 h-12 bg-border-color w-fit rounded-xl max-sm:grow max-sm:justify-center">
									<Volume2 />
									<p className="text-xl">{numbers.voice}</p>
								</div>
							</Tooltip>
							<Tooltip content="role" className="p-1 px-3 bg-border-color rounded-xl" delay={300}>
								<div className="flex items-center gap-1 px-3 h-12 bg-border-color w-fit rounded-xl max-sm:grow max-sm:justify-center">
									<Users />
									<p className="text-xl">{data.serialized_source_guild.roles.length}</p>
								</div>
							</Tooltip>
						</div>
					</section>

					<section className="flex items-center gap-3 mt-10 max-sm:flex-col max-sm:w-full max-sm:mt-5">
						<Button className="flex items-center bg-primary-color px-8 py-6 rounded-xl max-sm:w-full cursor-pointer" onPress={() => setPopup(true)}>
							<Plus />
							Użyj szablonu
						</Button>

						<Link href={`/preview/${base.slugUrl}`} className="max-sm:w-full">
							<Button className="flex items-center bg-advice-bot px-8 py-6 rounded-xl max-sm:w-full cursor-pointer">
								<Bot />
								Przejdź do podglądu szablonu
							</Button>
						</Link>
					</section>
				</motion.section>
				<TemplatesVisuzalization filtredChannel={channels} filtredRoles={filtredRoles} />
			</motion.main>
		</>
	)
}
