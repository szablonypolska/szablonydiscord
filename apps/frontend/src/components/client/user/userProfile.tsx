import { User } from "../../interfaces/common"
import Image from "next/image"
import discord from "../../../../public/discord-mini-icon.png"
import { Button } from "@nextui-org/button"
import Cards from "@/components/client/card"

interface Props {
	data: User
}

export default function UserProfle({ data }: Props) {
	console.log(data)
	return (
		<>
			<div className="flex gap-10 items-start my-32">
				<div className="flex flex-col items-center bg-boxColor border border-borderColor p-5 w-[22rem] px-10 z-10 rounded-xl flex-shrink-0">
					<Image src={`https://cdn.discordapp.com/avatars/${data.userId}/${data.avatar}.jpg`} width={150} height={150} alt="avatar" className="rounded-full" />
					<h1 className="mt-5 text-xl font-medium">{data.username}</h1>
					<p className="text-silverColor">({data.userId})</p>
					<Button className="flex items-center bg-[#272a47] w-full rounded-full text-[#5865F2] mt-7">
						<Image src={discord} alt="discord logo" />
						Profil discord
					</Button>
				</div>
				<div className="w-full">
					<h2 className="text-xl">Dodane szablony ({data.template.length})</h2>
					<div className="grid grid-cols-2   gap-5 mt-6 w-full">
						{data.template.map((el, index) => (
							<Cards key={index} title={el.title} description={el.description as string} usageCount={el.usageCount} categories={el.categories} templateId={el.templateId} />
						))}
					</div>
				</div>
			</div>
		</>
	)
}
