import ChannelList from "@/components/client/preview/channelListPreview"
import ContentPreview from "@/components/client/preview/contentPreview"
import LeftSidebar from "@/components/client/preview/leftSidebarPreview"
import RightSidebarPreview from "@/components/client/preview/rightSidebarPreview"
import TopSidebarPreview from "@/components/client/preview/topSidebarPreview"

interface Params {
	id: string
}

export default async function Preview(props: { params: Promise<Params> }) {
	const params = await props.params
	const { id } = await params

	return (
		<>
			<div className="flex">
				<LeftSidebar />
				<ChannelList />
				<div className="w-full h-full">
					<TopSidebarPreview />
					<ContentPreview />
				</div>
				<RightSidebarPreview />
			</div>
		</>
	)
}
