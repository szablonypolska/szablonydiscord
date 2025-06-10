"use client"

import { Tooltip } from "@heroui/react"
import { Button } from "@nextui-org/button"
import { cn } from "@/lib/utils"
import { Button as ButtonCopy } from "@/components/ui/button"
import { Check, Copy } from "lucide-react"
import { useState, useMemo } from "react"
import { ChevronDown } from "lucide-react"
import { ChannelPermission } from "../../../icons/channelPermissions"
import { Roles, Channel, Category } from "@/components/interfaces/builder/common"
import PreviewChannelLoading from "./loading/previewChannelLoading"
import PreviewRolesLoading from "./loading/previewRolesLoading"
import { useBuilderContext } from "@/context/BuilderContext"
import { VoiceChannelPermission } from "../../../icons/voiceChannelPerrmisions"
import { VoiceChannelIcon } from "../../../icons/voiceChannel"
import { ChannelIcon } from "../../../icons/channel"

interface Type {
	filtredChannel: Channel[]
	filtredRoles: Roles[]
	categories?: Category[]
}

export default function PreviewVisualization({ filtredChannel, filtredRoles, categories }: Type) {
	const [copied, setCopied] = useState<boolean>(false)
	const { builderData } = useBuilderContext()

	const sortedChannels = useMemo(() => {
		const sortedCategories = categories ? [...categories].sort((a, b) => a.position - b.position) : []

		const channelsByCategory: { [key: string]: Channel[] } = {}

		if (categories) {
			categories.forEach(category => {
				channelsByCategory[category.id] = []
			})
		}

		filtredChannel.forEach(channel => {
			const categoryId = channel.parentId
			if (!channelsByCategory[categoryId]) {
				channelsByCategory[categoryId] = []
			}
			channelsByCategory[categoryId].push(channel)
		})

		Object.keys(channelsByCategory).forEach(categoryId => {
			channelsByCategory[categoryId].sort((a, b) => a.position - b.position)
		})

		const result: Channel[] = []

		if (channelsByCategory[""] && channelsByCategory[""].length > 0) {
			channelsByCategory[""].forEach(channel => result.push(channel))
		}

		if (categories) {
			sortedCategories.forEach(category => {
				result.push({
					id: category.id,
					name: category.name,
					parentId: "",
					position: category.position,
					type: 4,
					private: false,
				})

				if (channelsByCategory[category.id]) {
					channelsByCategory[category.id].forEach(channel => {
						result.push(channel)
					})
				}
			})
		} else {
			return [...filtredChannel].sort((a, b) => a.position - b.position)
		}

		return result
	}, [filtredChannel, categories])

	const channelStyles: { [key: number]: string } = {
		0: "flex items-center gap-1 pl-4 my-1  font-medium text-channelColor text-lg w-96 max-md:w-full  hover:bg-borderColor truncate rounded-lg", // Tekstowy
		2: "flex items-center gap-1 pl-4 my-1 text-channelColor text-lg  w-96 max-md:w-full hover:bg-borderColor truncate rounded-lg", // Głosowy
		4: "flex items-center gap-1 font-bold text-lg mt-2  text-textColor hover:text-white w-11/12 max-md:w-full", // Kategoria
	}

	const channelIcons: { [key: number]: React.ReactNode } = {
		0: <ChannelIcon />,
		2: <VoiceChannelIcon />,
		4: <ChevronDown className="text-channelColor w-4 h-4 mr-0.5" />,
		5: <ChannelPermission />,
		6: <VoiceChannelPermission />,
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
			<section className="items-center mt-5 w-full">
				<div className="flex gap-5 rounded-xl w-full max-xl:flex-col">
					{builderData.channel.length === 0 && builderData.category.length === 0 && <PreviewChannelLoading />}
					{(builderData.channel.length > 0 || builderData.category.length > 0) && (
						<article className="bg-altBackgroundColor border border-borderColor rounded-xl w-1/2 p-8 max-lg:w-full min-h-96 max-xl:w-full ">
							{sortedChannels.map((el: Channel, index) => (
								<div className={`relative flex items-center w-96 max-md:w-full ${el.type !== 4 && "hover:bg-borderColor"} truncate rounded-lg group`} key={index}>
									<div className={`flex items-center ${el.type !== 4 && "hover:bg-borderColor"} rounded-lg group w-full`} key={`inner-${index}`}>
										<div className={`w-full ${channelStyles[el.type || 0]}`} key={`style-${index}`}>
											<span className="text-2xl text-channelColor font-black">{el.type === 0 ? (el.private ? channelIcons[5] : channelIcons[el.type || 0]) : el.type === 2 && el.private ? channelIcons[6] : channelIcons[el.type || 0]}</span>
											<p>{el.name}</p>
										</div>
									</div>

									{el.type !== 4 && (
										<ButtonCopy size="icon" className="disabled:opacity-100 hidden group-hover:flex" onClick={() => handleCopyName(el.name)} aria-label={copied ? "Copied" : "Copy to clipboard"} disabled={copied}>
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
					)}
					{builderData.roles.length === 0 && <PreviewRolesLoading />}
					{builderData.roles.length > 0 && (
						<article className="bg-altBackgroundColor border border-borderColor rounded-xl w-1/2 p-8 max-lg:w-full min-h-96 max-xl:w-full flex-shrink-0">
							<div className="flex flex-wrap gap-2">
								{filtredRoles.map((el: Roles, index) => {
									const hexColor = `#${parseInt(el.color).toString(16).padStart(6, "0")}`

									console.log(hexColor, el.name, el.color)

									return (
										<div style={{ borderColor: hexColor }} className="flex items-center gap-2 border-2 py-1 px-4 rounded-full whitespace-nowrap overflow-hidden" key={index}>
											<Tooltip content="Skopiuj hex color" className="bg-boxColor border border-borderColor p-1 px-5 rounded-xl" delay={500}>
												<Button style={{ backgroundColor: hexColor }} className="w-4 h-4 px-0 rounded-full" onPress={() => copyLink(hexColor)}></Button>
											</Tooltip>
											<h2>{el.name}</h2>
										</div>
									)
								})}
							</div>
						</article>
					)}
				</div>
			</section>
		</>
	)
}
