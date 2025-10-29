"use client"

import { Tooltip } from "@heroui/react"
import { Button } from "@nextui-org/button"
import { cn } from "@/lib/utils"
import { Button as ButtonCopy } from "@/components/ui/button"
import { Check, Copy } from "lucide-react"
import { useState, useMemo } from "react"
import { Role, Category, Channel } from "@/components/interfaces/builder/common"
import PreviewChannelLoading from "./loading/previewChannelLoading"
import PreviewRolesLoading from "./loading/previewRolesLoading"
import { useBuilderContext } from "@/context/BuilderContext"
import { motion } from "framer-motion"
import SelectedIconChannel from "@/utils/visualization/selectedIconChannel"
import { channelStyle } from "@/utils/visualization/channelStyle"

interface Type {
	allChannels: (Channel | Category)[]
	roles: Role[]
	categories: Category[]
	channels: Channel[]
}

export default function PreviewVisualization({ allChannels, roles, categories, channels }: Type) {
	const [copied, setCopied] = useState<boolean>(false)

	const sortedChannels = useMemo(() => {
		const sortedCategories = categories ? [...categories].sort((a, b) => a.position - b.position) : []

		const channelsByCategory: { [key: string]: Channel[] } = {}

		if (categories) {
			categories.forEach(category => {
				channelsByCategory[category.id] = []
			})
		}

		allChannels.forEach((channel: Channel) => {
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
					id: category.id.toString(),
					name: category.name,
					parentId: "",
					position: category.position,
					type: 4,
					private: false,
					stageId: category.stageId,
				})

				if (channelsByCategory[category.id]) {
					channelsByCategory[category.id].forEach(channel => {
						result.push(channel)
					})
				}
			})
		} else {
			return [...allChannels].sort((a, b) => a.position - b.position)
		}

		return result
	}, [allChannels, categories])

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
			<section className="items-center mt-5 w-full ">
				<div className="flex gap-5 rounded-xl w-full max-xl:flex-col">
					{channels.length === 0 && categories.length === 0 && <PreviewChannelLoading />}
					{(channels.length > 0 || categories.length > 0) && (
						<motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.3 }} className="bg-alt-background-color border border-border-color rounded-xl w-1/2 p-8 max-lg:w-full min-h-96 max-xl:w-full ">
							{sortedChannels.map((el: Channel, index) => (
								<div className={`relative flex items-center w-96 max-md:w-full  ${el.type !== 4 && "hover:bg-border-color"} truncate rounded-lg group`} key={index}>
									<div className={`flex items-center ${el.type !== 4 && "hover:bg-border-color"} rounded-lg group w-full`} key={`inner-${index}`}>
										<div className={`w-full ${channelStyle(el.type)}`} key={`style-${index}`}>
											<span className="text-2xl text-channel-color font-black">{SelectedIconChannel(el)}</span>
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
						</motion.article>
					)}
					{roles.length === 0 && <PreviewRolesLoading />}
					{roles.length > 0 && (
						<motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.3 }} className="bg-alt-background-color border border-border-color rounded-xl w-1/2 p-8 max-lg:w-full min-h-96 max-xl:w-full shrink-0">
							<div className="flex flex-wrap gap-2">
								{roles.map((el: Role, index) => {
									const hexColor = `#${parseInt(el.color).toString(16).padStart(6, "0")}`

									return (
										<div style={{ borderColor: hexColor }} className="flex items-center gap-2 border-2 py-1 px-4 rounded-full whitespace-nowrap overflow-hidden" key={index}>
											<Tooltip content="Skopiuj hex color" className="bg-box-color border border-border-color p-1 px-5 rounded-xl" delay={500}>
												<Button style={{ backgroundColor: hexColor }} className="w-4 h-4 px-0 rounded-full cursor-pointer" onPress={() => copyLink(hexColor)}></Button>
											</Tooltip>
											<h2>{el.name}</h2>
										</div>
									)
								})}
							</div>
						</motion.article>
					)}
				</div>
			</section>
		</>
	)
}
