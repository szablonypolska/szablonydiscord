"use client"

import { User } from "../../interfaces/common"
import Image from "next/image"
import discord from "../../../../public/discord-mini-icon.png"
import { Button } from "@nextui-org/button"
import StatisticsProfile from "./userStatistics"
import TemplatesProfile from "./userTemplates"
import { Check } from "lucide-react"
import { Tooltip } from "@heroui/react"
import Link from "next/link"
import discordUserAvatar from "../../../../public/discordUserAvatar.jpg"

interface Props {
	data: User
}

export default function UserProfle({ data }: Props) {
	console.log(data)
	return (
		<>
			<div className="flex max-md:flex-col gap-5 items-start my-32">
				<div className="max-md:w-full">
					<div className="flex flex-col items-center bg-boxColor border border-borderColor p-5 w-[22rem] max-xl:w-72 max-md:w-full px-10 z-10 rounded-xl flex-shrink-0">
						<div className="relative">
							<Image src={`${data.avatar ? `https://cdn.discordapp.com/avatars/${data.userId}/${data.avatar}.jpg` : discordUserAvatar.src}`} width={150} height={150} alt="avatar" className="rounded-full" />
							{data.register && (
								<Tooltip content="Zarejestrowane konto" className="bg-altBackgroundColor p-2 rounded-xl">
									<div className="absolute bottom-2 right-0 p-1.5 bg-primaryColor w-fit rounded-full">
										<Check size="25" />
									</div>
								</Tooltip>
							)}
						</div>
						<h1 className="mt-5 text-xl font-medium">{data.username}</h1>
						<p className="text-silverColor">({data.userId})</p>
						<Link href={`https://discordapp.com/users/${data.userId}`} className="w-full">
							<Button className="flex items-center bg-[#272a47] w-full rounded-full text-[#5865F2] mt-7">
								<Image src={discord} alt="discord logo" />
								Profil discord
							</Button>
						</Link>
					</div>
					<StatisticsProfile data={data} />
				</div>
				<TemplatesProfile data={data} />
			</div>
		</>
	)
}
