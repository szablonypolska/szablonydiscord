"use client"

import { Channel, Roles } from "@/components/interfaces/templates/common"
import { Tooltip } from "@heroui/react"
import { Button } from "@nextui-org/button"
import { cn } from "@/lib/utils"
import { Button as ButtonCopy } from "@/components/ui/button"
import { Check, Copy } from "lucide-react"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { ChannelPermission } from "../../icons/channelPermissions"
import { ChannelIcon } from "../../icons/channel"
import { VoiceChannelIcon } from "../../icons/voiceChannel"
import { NsfwIcon } from "../../icons/nsfwIcon"

interface Type {
	filtredChannel: Channel[]
	filtredRoles: Roles[]
}

export default function TemplatesVisuzalization({ filtredChannel, filtredRoles }: Type) {
	const [copied, setCopied] = useState<boolean>(false)
	const channelStyles: { [key: number]: string } = {
		0: "flex items-center gap-1 pl-4 my-1  font-medium text-channel-color text-lg w-96 max-md:w-full  hover:bg-border-color truncate rounded-lg", // Tekstowy
		2: "flex items-center gap-1 pl-4 my-1 text-channel-color text-lg  w-96 max-md:w-full hover:bg-border-color truncate rounded-lg", // Głosowy
		4: "flex items-center gap-1 font-bold text-lg mt-2  text-text-color hover:text-white w-96 max-md:w-full", // Kategoria
	}

	const channelIcons: { [key: number]: React.ReactNode } = {
		0: <ChannelIcon />,
		2: <VoiceChannelIcon />,
		4: <ChevronDown className="text-channel-color w-4 h-4 mr-0.5" />,
		5: <ChannelPermission />,
		7: <NsfwIcon />,
	}

	const copyLink = (hex: string) => {
		navigator.clipboard.writeText(hex)
	}

	const handleCopyName = async (name: string) => {
		try {
			navigator.clipboard.writeText(name)
			setCopied(true)
			setTimeout(() => setCopied(false), 1500)
		} catch (err) {
			console.error(err)
		}
	}

	const icon = (el: Channel) => {
		if (el.type === 0 && el.permission_overwrites && el.permission_overwrites.length === 0 && !el.nsfw) {
			return channelIcons[0]
		} else if (el.type === 0 && el.nsfw) {
			return <NsfwIcon />
		} else if (el.type === 0 && el.permission_overwrites && el.permission_overwrites.length > 0 && !el.nsfw) {
			return channelIcons[5]
		} else if (el.type === 4) {
			return channelIcons[4]
		} else {
			return channelIcons[2]
		}
	}

	return (
		<>
			<section className="items-center mt-5">
				<div className="flex gap-5  rounded-xl max-lg:flex-col ">
					<article className="bg-alt-background-color border border-border-color rounded-xl  p-8 flex-1 flex-grow flex-shrink-0">
						{filtredChannel.map((el: Channel) => (
							<div className={`flex items-center w-96 max-md:w-full ${el.type !== 4 && "hover:bg-border-color"} truncate rounded-lg group`} key={el.id}>
								<div className={`flex items-center   ${el.type !== 4 && "hover:bg-border-color"}  rounded-lg group w-full`} key={el.id}>
									<div className={`w-full ${channelStyles[el.type]}`} key={el.id}>
										<span className="text-2xl text-channel-color  font-black">{icon(el)}</span>
										<p>{el.name}</p>
									</div>
								</div>

								{el.type !== 4 && (
									<ButtonCopy size="icon" className="disabled:opacity-100 hidden group-hover:flex cursor-pointer" onClick={() => handleCopyName(el.name)} aria-label={copied ? "Copied" : "Copy to clipboard"} disabled={copied}>
										<div className={cn("transition-all", copied ? "scale-100 opacity-100" : "scale-0 opacity-0")}>
											<Check className="stroke-primary-color" size={16} strokeWidth={2} aria-hidden="true" />
										</div>
										<div className={cn("absolute transition-all text-text-color", copied ? "scale-0 opacity-0" : "scale-100 opacity-100")}>
											<Copy size={16} strokeWidth={2} aria-hidden="true" />
										</div>
									</ButtonCopy>
								)}
							</div>
						))}
					</article>
					<article className="bg-alt-background-color border border-border-color rounded-xl  p-8 max-lg:w-full flex-1 flex-shrink-0">
						<div className="flex flex-wrap gap-2">
							{filtredRoles.map((el: Roles) => {
								const hexColor = `#${el.color.toString(16).padStart(6, "0")}`

								return (
									<div style={{ borderColor: hexColor }} className="flex items-center gap-2 border-2 py-1 px-4 rounded-full whitespace-nowrap overflow-hidden" key={el.id}>
										<Tooltip content="Skopiuj hex color" className="bg-box-color border border-border-color p-1 px-5 rounded-xl" delay={500}>
											<Button style={{ backgroundColor: hexColor }} className="w-4 h-4 px-0 rounded-full cursor-pointer" onPress={() => copyLink(hexColor)}></Button>
										</Tooltip>
										<h2>{el.name}</h2>
									</div>
								)
							})}
						</div>
					</article>
				</div>
			</section>
		</>
	)
}
