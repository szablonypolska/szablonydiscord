"use client"

import { useBuilderContext } from "@/context/BuilderContext"
import { Tooltip } from "@heroui/react"
import { Button } from "@nextui-org/button"
import { Bot, Download, Eye, Plus, Users, Volume2 } from "lucide-react"
import { useSession } from "next-auth/react"
import PreviewVisualization from "./previewVisualization"
import { PreviewCreator } from "./previewCreator"
import { motion } from "framer-motion"

export default function PreviewTemplate() {
	const { builderData } = useBuilderContext()
	const { data: session } = useSession()

	const channels = [...builderData.category, ...builderData.channel]

	return (
		<div className="flex flex-col items-center w-full ">
			<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-altBackgroundColor w-full p-8 rounded-xl border border-borderColor max-lg:p-5">
				<header>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4 w-full">
							{builderData.title ? <h1 className="text-2xl max-w-[30rem] truncate max-lg:max-w-96">{builderData.title}</h1> : <div className="w-72 h-8 bg-borderColor rounded-lg animate-pulse"></div>}

							<div className="flex gap-1 max-sm:hidden">
								<span className="px-4 py-1 bg-borderColor w-fit text-sm rounded-full">AI</span>
							</div>
						</div>
						<div className="flex items-center gap-2 opacity-80">
							<Tooltip content="Odsłony szablonu" className="p-1 px-3 bg-borderColor rounded-xl" delay={300}>
								<div className="flex items-center gap-1 px-3 py-1 bg-borderColor w-fit rounded-xl max-md:hidden">
									<Eye className="font-black" />
									<p className="text-2xl ml-0.2">0</p>
								</div>
							</Tooltip>
							<Tooltip content="Użycia szablonu" className="p-1 px-3 bg-borderColor rounded-xl" delay={300}>
								<div className="flex items-center gap-1 px-3 py-1 bg-borderColor w-fit rounded-xl max-md:hidden">
									<Download />
									<p className="text-2xl ml-0.2">0</p>
								</div>
							</Tooltip>
						</div>
					</div>
					{builderData.description ? <p className="text-textColor text-lg md:w-9/12 max-md:w-full">{builderData.description}</p> : <div className="w-[28rem] h-6 bg-borderColor rounded-lg animate-pulse"></div>}
				</header>

				<section className="flex items-center gap-2 mt-5 max-sm:flex-col">
					<PreviewCreator avatar={session?.user.image || ""} username={session?.user.name || ""} id={session?.user.id || ""} />
					<div className="flex gap-2 max-sm:mt-2 max-sm:w-full">
						<Tooltip content="Kanały tekstowe" className="p-1 px-3 bg-borderColor rounded-xl" delay={300}>
							<div className="flex items-center gap-1 px-3 h-12 bg-borderColor w-fit rounded-xl max-sm:flex-grow max-sm:justify-center">
								<span className="text-2xl">#</span>
								<p className="text-xl">{builderData.channel.length}</p>
							</div>
						</Tooltip>
						<Tooltip content="Kanały głosowe" className="p-1 px-3 bg-borderColor rounded-xl" delay={300}>
							<div className="flex items-center gap-1 px-3 h-12 bg-borderColor w-fit rounded-xl max-sm:flex-grow max-sm:justify-center">
								<Volume2 />
								<p className="text-xl">0</p>
							</div>
						</Tooltip>
						<Tooltip content="role" className="p-1 px-3 bg-borderColor rounded-xl" delay={300}>
							<div className="flex items-center gap-1 px-3 h-12 bg-borderColor w-fit rounded-xl max-sm:flex-grow max-sm:justify-center">
								<Users />
								<p className="text-xl">{builderData.roles.length}</p>
							</div>
						</Tooltip>
					</div>
				</section>

				<section className="flex items-center gap-3 mt-8 max-sm:flex-col max-sm:w-full max-sm:mt-5">
					<Button className="flex items-center bg-primaryColor px-8 py-6 rounded-xl max-sm:w-full opacity-30 cursor-not-allowed" disabled>
						<Plus />
						Użyj szablonu
					</Button>

					<Button className="flex items-center bg-adviceBot px-8 py-6 rounded-xl max-sm:w-full opacity-30 cursor-not-allowed" disabled>
						<Bot />
						Przejdź do podglądu szablonu
					</Button>
				</section>
			</motion.div>
			<PreviewVisualization filtredChannel={channels} filtredRoles={builderData.roles} categories={builderData.category} />
		</div>
	)
}
