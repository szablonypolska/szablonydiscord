"use client"

import { motion } from "framer-motion"
import { Button } from "@nextui-org/button"
import { DiscordTemplate, BaseInforamtion } from "../../../interfaces/templates/common"
import Image from "next/image"
import TemplatesVisuzalization from "./templatesVisualizaton"
import Link from "next/link"
import { Channel, Roles } from "@/components/interfaces/templates/common"
import { Download, Eye } from "lucide-react"
import { Tooltip } from "@heroui/react"

interface Props {
	data: DiscordTemplate
	base: BaseInforamtion
}

interface PropsCreator {
	id: string
	avatar: string
	username: string
}

function UserCreator({ avatar, username, id }: PropsCreator) {
	return (
		<Link href={`/profile/${id}`} className="max-sm:w-full">
			<Button className="px-3 h-12 bg-borderColor w-fit rounded-xl max-sm:w-full">
				<div className="flex items-center gap-2 h-full">
					<Image src={`https://cdn.discordapp.com/avatars/${id}/${avatar}.jpg`} width={0} height={0} alt="discord user avatar" className="w-7 h-7 rounded-full" />
					<div className="flex items-center gap-2">
						<p className="text-lg">Twórca:</p>
						<p className="text-lg">{username}</p>
					</div>
				</div>
			</Button>
		</Link>
	)
}

export default function TemplatesDetails({ data, base }: Props) {
	const numbers = data.serialized_source_guild.channels.reduce(
		(acc, value) => {
			if (value.type === 0) acc.channels++
			if (value.type === 2) acc.voice++
			return acc
		},
		{ channels: 0, voice: 0 }
	)
	const { channels, roles } = data.serialized_source_guild
	const filtredChannel: Channel[] = channels.map(el => ({
		name: el.name,
		type: el.type,
		id: el.id,
	}))
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
		<motion.main className="flex flex-col items-center my-32" initial="hidden" animate="visible" variants={containerVariants}>
			<motion.section className="bg-altBackgroundColor w-[70rem] max-xl:w-11/12 p-8 rounded-xl border border-borderColor max-lg:p-5" variants={containerVariants}>
				<header>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4 w-full">
							<h1 className="text-2xl max-w-[30rem] truncate max-lg:max-w-96">{base.title}</h1>
							<div className="flex gap-1 max-sm:hidden">
								<span className="px-4 py-1 bg-borderColor w-fit text-sm rounded-full">{base.categories}</span>
							</div>
						</div>
						<div className="flex items-center gap-2">
							<div className="flex items-center gap-1 px-3 py-1 bg-borderColor w-fit rounded-xl max-md:hidden">
								<Eye className="font-black" />
								<p className="text-2xl ml-0.2">{base.historyLength}</p>
							</div>
							<div className="flex items-center gap-1 px-3 py-1 bg-borderColor w-fit rounded-xl max-md:hidden">
								<Download />
								<p className="text-2xl ml-0.2">{data.usage_count}</p>
							</div>
						</div>
					</div>
					<p className="text-textColor text-lg md:w-9/12 max-md:w-full">{base.description}</p>
					<div className="max-sm:flex hidden mt-3 gap-2">
						<span className="px-4 py-1 bg-borderColor  text-sm rounded-full w-full  text-center">{base.categories}</span>
						<span className="px-4 py-1 bg-borderColor  text-sm rounded-full w-full text-center">Gamingowy</span>
					</div>
				</header>

				<section className="flex items-center gap-2 mt-5 max-sm:flex-col">
					<UserCreator avatar={data.creator.avatar} username={data.creator.username} id={data.creator.id} />
					<div className="flex gap-2 max-sm:mt-2 max-sm:w-full">
						<div className="flex items-center gap-1 px-3 h-12 bg-borderColor w-fit rounded-xl max-sm:flex-grow max-sm:justify-center">
							<span className="text-2xl">#</span>
							<p className="text-xl">{numbers.channels}</p>
						</div>
						<div className="flex items-center gap-1 px-3 h-12 bg-borderColor w-fit rounded-xl max-sm:flex-grow max-sm:justify-center">
							<span className="material-symbols-outlined text-2xl">volume_up</span>
							<p className="text-xl">{numbers.voice}</p>
						</div>
						<div className="flex items-center gap-1 px-3 h-12 bg-borderColor w-fit rounded-xl max-sm:flex-grow max-sm:justify-center">
							<span className="material-symbols-outlined text-2xl">people</span>
							<p className="text-xl">{data.serialized_source_guild.roles.length}</p>
						</div>
					</div>
				</section>

				<section className="flex items-center gap-3 mt-10 max-sm:flex-col max-sm:w-full max-sm:mt-5">
					<Link href={base.link} className="max-sm:w-full">
						<Button className="flex items-center bg-primaryColor px-8 py-6 rounded-xl max-sm:w-full">
							<span className="material-symbols-outlined text-2xl">add</span>
							Użyj szablonu
						</Button>
					</Link>
					<Tooltip content="Opcja aktualnie niedostępna." className="bg-background p-1 px-5 rounded-xl">
						<Button className="flex items-center bg-adviceBot px-8 py-6 rounded-xl max-sm:w-full cursor-not-allowed">
							<span className="material-symbols-outlined text-2xl">smart_toy</span>
							Stwórz za pomocą AdviceBot
						</Button>
					</Tooltip>
				</section>
			</motion.section>
			<TemplatesVisuzalization filtredChannel={filtredChannel} filtredRoles={filtredRoles} />
		</motion.main>
	)
}
