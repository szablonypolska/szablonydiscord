"use client"

import { Channel, Roles } from "@/components/interfaces/templates/common"
import { Tooltip } from "@heroui/react"
import { Button } from "@nextui-org/button"
import { cn } from "@/lib/utils"
import { Button as ButtonCopy } from "@/components/ui/button"
import { Check, Copy } from "lucide-react"
import { useState } from "react"
import SelectedIconChannel from "@/utils/visualization/selectedIconChannel"
import { channelStyle } from "@/utils/visualization/channelStyle"

interface Type {
	filtredChannel: Channel[]
	filtredRoles: Roles[]
}

export default function TemplatesVisuzalizationPage({ filtredChannel, filtredRoles }: Type) {
	const [copied, setCopied] = useState<boolean>(false)

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
			<section className="mt-5 w-full">
				<div className="flex gap-5  rounded-xl max-md:flex-col w-full ">
					<article className="bg-alt-background-color border border-border-color rounded-xl p-8 max-md:min-w-0 max-md:w-full md:w-1/2">
						{filtredChannel.map((el: Channel) => (
							<div className={`flex items-center  ${el.type !== 4 && "hover:bg-border-color"} truncate rounded-lg group`} key={el.id}>
								<div className={`flex items-center   ${el.type !== 4 && "hover:bg-border-color"}  rounded-lg group w-full`} key={el.id}>
									<div className={`w-full ${channelStyle(el.type)}`} key={el.id}>
										<span className="text-2xl text-channel-color  font-black"> {SelectedIconChannel(el)}</span>
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
					<article className="bg-alt-background-color border border-border-color rounded-xl p-8 flex-1 max-lg:w-full max-md:w-full md:w-1/2 ">
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
