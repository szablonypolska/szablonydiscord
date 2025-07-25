"use client"

import ChannelList from "./channelListPreview"
import ContentPreview from "./contentPreview"
import LeftSidebar from "./leftSidebarPreview"
import RightSidebarPreview from "./rightSidebarPreview"
import TopSidebarPreview from "./topSidebarPreview"
import { DiscordTemplate } from "../../interfaces/templates/common"
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"

interface Props {
	dataTemplate: DiscordTemplate
	slugUrl: string
}

export default function DiscordPreviewLayout({ dataTemplate, slugUrl }: Props) {
	return (
		<PanelGroup direction="horizontal" className="w-full h-screen">
			<LeftSidebar />
			<Panel defaultSize={10} minSize={20} maxSize={25} className="w-[20rem]">
				<ChannelList dataTemplate={dataTemplate} slugUrl={slugUrl} />
			</Panel>
			<PanelResizeHandle className=" cursor-col-resize" />

			<Panel className="flex w-full">
				<div className="w-full h-full">
					<TopSidebarPreview />
					<ContentPreview />
				</div>
				<RightSidebarPreview dataTemplate={dataTemplate} />
			</Panel>
		</PanelGroup>
	)
}
