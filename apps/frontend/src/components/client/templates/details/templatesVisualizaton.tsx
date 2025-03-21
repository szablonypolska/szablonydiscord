"use client"

import { Channel, Roles } from "@/components/interfaces/templates/common"
import { Tooltip } from "@heroui/react"
import { Button } from "@nextui-org/button"
import { cn } from "@/lib/utils"
import { Button as ButtonCopy } from "@/components/ui/button"
import { Check, Copy } from "lucide-react"
import { useState } from "react"

interface Type {
	filtredChannel: Channel[]
	filtredRoles: Roles[]
}

export default function TemplatesVisuzalization({ filtredChannel, filtredRoles }: Type) {
	const [copied, setCopied] = useState<boolean>(false)
	const channelStyles: { [key: number]: string } = {
		0: "flex items-center pl-4 my-1  font-medium text-channelColor text-lg w-96 max-md:w-full  hover:bg-borderColor truncate rounded-lg", // Tekstowy
		2: "flex items-center gap-2 pl-4 my-1 text-channelColor text-lg  w-96 max-md:w-full hover:bg-borderColor truncate rounded-lg", // Głosowy
		4: "flex items-center gap-1 font-bold text-lg mt-2  text-textColor hover:text-white w-96 max-md:w-full", // Kategoria
	}

	const channelIcons: { [key: number]: string } = {
		0: "tag",
		2: "volume_up",
		4: "keyboard_arrow_down",
	}

	const channelIconsStyle: { [key: number]: string } = {
		0: "text-2xl pr-2",
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

	return (
		<>
			<section className="items-center mt-5 max-xl:w-11/12">
				<div className="flex w-[70rem] max-xl:w-full gap-5 rounded-xl max-lg:flex-col max-lg:w-full">
					<article className="bg-altBackgroundColor border border-borderColor rounded-xl w-1/2 p-8 max-lg:w-full">
						{filtredChannel.map((el: Channel) => (
							<div className={`flex items-center w-96 max-md:w-full ${el.type !== 4 && "hover:bg-borderColor"} truncate rounded-lg group`} key={el.id}>
								<p className={channelStyles[el.type]}>
									<span className={`text-2xl text-channelColor material-symbols-outlined font-black ${channelIconsStyle[el.type]}`}>{channelIcons[el.type]}</span> {el.name}
								</p>

								{el.type !== 4 && (
									<ButtonCopy
										size="icon"
										className="disabled:opacity-100 hidden group-hover:flex"
										onClick={() => handleCopyName(el.name)}
										aria-label={copied ? "Copied" : "Copy to clipboard"}
										disabled={copied}>
										<div className={cn("transition-all", copied ? "scale-100 opacity-100" : "scale-0 opacity-0")}>
											<Check className="stroke-primaryColor" size={16} strokeWidth={2} aria-hidden="true" />
										</div>
										<div className={cn("absolute transition-all text-textColor", copied ? "scale-0 opacity-0" : "scale-100 opacity-100")}>
											<Copy size={16} strokeWidth={2} aria-hidden="true" />
										</div>
									</ButtonCopy>
								)}
							</div>
						))}
					</article>
					<article className="bg-altBackgroundColor border border-borderColor rounded-xl w-1/2 p-8 max-lg:w-full">
						<div className="flex flex-wrap gap-2">
							{filtredRoles.map((el: Roles) => {
								const hexColor = `#${el.color.toString(16).padStart(6, "0")}`

								return (
									<div style={{ borderColor: hexColor }} className="flex items-center gap-2 border-2 py-1 px-4 rounded-full whitespace-nowrap overflow-hidden" key={el.id}>
										<Tooltip content="Skopiuj hex color" className="bg-boxColor border border-borderColor p-1 px-5 rounded-xl" delay={500}>
											<Button style={{ backgroundColor: hexColor }} className="w-4 h-4 px-0 rounded-full" onPress={() => copyLink(hexColor)}></Button>
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
