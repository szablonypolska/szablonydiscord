"use client"

import ChannelList from "./channelListPreview"
import ContentPreview from "./contentPreview"
import LeftSidebar from "./leftSidebarPreview"
import RightSidebarPreview from "./rightSidebarPreview"
import TopSidebarPreview from "./topSidebarPreview"
import { DiscordTemplate } from "../../interfaces/templates/common"
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"
import useWindowSize from "@/hooks/useWindowSize"
import { useEffect, useState } from "react"
import TopSidebarOnMobile from "./topSidebarOnMobile"

interface Props {
	dataTemplate: DiscordTemplate
	slugUrl: string
}

export default function DiscordPreviewLayout({ dataTemplate, slugUrl }: Props) {
	const { width } = useWindowSize()
	const [minSize, setMinSize] = useState<number>(10)

	useEffect(() => {
		if (width && width <= 1550) {
			setMinSize(40)
		} else if (width && width >= 1551) {
			setMinSize(20)
		} else {
			setMinSize(10)
		}
	}, [width])

	return (
		<PanelGroup key={minSize} direction="horizontal" className="w-full h-screen">
			<LeftSidebar />
			<Panel defaultSize={20} minSize={minSize} maxSize={40} className="max-lg:hidden">
				<div className="">
					<ChannelList dataTemplate={dataTemplate} slugUrl={slugUrl} />
				</div>
			</Panel>

			<div className="lg:hidden w-full max-lg:absolute">
				<TopSidebarOnMobile name={dataTemplate.serialized_source_guild.name} />
				<div className="flex">
					<LeftSidebar />
					<ChannelList dataTemplate={dataTemplate} slugUrl={slugUrl} />
					<RightSidebarPreview dataTemplate={dataTemplate} />
				</div>
			</div>

			<PanelResizeHandle className=" cursor-col-resize" />

			<Panel className="flex w-full">
				<div className="w-full h-full">
					<TopSidebarOnMobile name={dataTemplate.serialized_source_guild.name} />
					<TopSidebarPreview />
					<ContentPreview />
				</div>
				<div className="max-lg:hidden">
					<RightSidebarPreview dataTemplate={dataTemplate} />
				</div>
			</Panel>
		</PanelGroup>
	)
}
