"use client"

import { motion } from "framer-motion"
import { Button } from "@nextui-org/button"
import { DiscordTemplate, BaseInforamtion } from "../../../interfaces/templates/common"
import Image from "next/image"
import TemplatesVisuzalization from "./templatesVisualizaton"
import Link from "next/link"
import { Channel, Roles } from "@/components/interfaces/templates/common"

interface Props {
	data: DiscordTemplate
	base: BaseInforamtion
}

interface PropsCreator {
	id: string
	avatar: string
	username: string
}

function UserCreator({ id, avatar, username }: PropsCreator) {
	return (
		<Link href={`/user/${id}`}>
			<Button className="px-3 h-12 bg-borderColor w-fit rounded-xl">
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
		visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
	}

	return (
		<motion.main className="flex flex-col items-center my-32" initial="hidden" animate="visible" variants={containerVariants}>
			<motion.section className="bg-altBackgroundColor w-[70rem] max-xl:w-11/12 p-8 rounded-xl border border-borderColor" variants={containerVariants}>
				<header>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<h1 className="text-2xl">{base.title}</h1>
							<div className="flex gap-1">
								<span className="px-4 py-1 bg-borderColor w-fit text-sm rounded-full">{base.categories}</span>
								<span className="px-4 py-1 bg-borderColor w-fit text-sm rounded-full">Gamingowy</span>
							</div>
						</div>
						<div className="flex items-center gap-1 px-3 py-1 bg-borderColor w-fit rounded-xl">
							<span className="material-symbols-outlined text-3xl">download</span>
							<p className="text-2xl">{data.usage_count}</p>
						</div>
					</div>
					<p className="text-textColor text-lg w-9/12">{base.description}</p>
				</header>

				<section className="flex items-center gap-2 mt-5">
					<UserCreator id={data.creator.id} avatar={data.creator.avatar} username={data.creator.username} />
					<div className="flex items-center gap-1 px-3 h-12 bg-borderColor w-fit rounded-xl">
						<span className="text-2xl">#</span>
						<p className="text-xl">{numbers.channels}</p>
					</div>
					<div className="flex items-center gap-1 px-3 h-12 bg-borderColor w-fit rounded-xl">
						<span className="material-symbols-outlined text-2xl">volume_up</span>
						<p className="text-xl">{numbers.voice}</p>
					</div>
					<div className="flex items-center gap-1 px-3 h-12 bg-borderColor w-fit rounded-xl">
						<span className="material-symbols-outlined text-2xl">people</span>
						<p className="text-xl">{data.serialized_source_guild.roles.length}</p>
					</div>
				</section>

				<section className="flex items-center gap-3 mt-10">
					<Link href={base.link}>
						<Button className="flex items-center bg-primaryColor px-8 py-6 rounded-xl">
							<span className="material-symbols-outlined text-2xl">add</span>
							Użyj szablonu
						</Button>
					</Link>
					<Button className="flex items-center bg-adviceBot px-8 py-6 rounded-xl">
						<span className="material-symbols-outlined text-2xl">smart_toy</span>
						Stwórz za pomocą AdviceBot
					</Button>
				</section>
			</motion.section>
			<TemplatesVisuzalization filtredChannel={filtredChannel} filtredRoles={filtredRoles} />
		</motion.main>
	)
}
