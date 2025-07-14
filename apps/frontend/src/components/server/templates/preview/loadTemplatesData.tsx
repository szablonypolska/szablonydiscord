import Footer from "@/components/client/footer"
import Navbar from "@/components/client/navbar"
import NotFoundWeb from "@/components/client/notFound"
import ChannelList from "@/components/client/preview/channelListPreview"
import ContentPreview from "@/components/client/preview/contentPreview"
import LeftSidebar from "@/components/client/preview/leftSidebarPreview"
import RightSidebarPreview from "@/components/client/preview/rightSidebarPreview"
import TopSidebarPreview from "@/components/client/preview/topSidebarPreview"
import redis from "@/lib/redis"
import getDataTemplate from "@/lib/templates/getData"
import { prisma } from "@repo/db"
import { DiscordTemplate } from "@/components/interfaces/templates/common"
import { differenceInDays } from "date-fns/differenceInDays"

export default async function LoadPreviewData({ id }: { id: string }) {
	let dataTemplate = {} as DiscordTemplate

	const data = await prisma.templates.findUnique({
		where: { slugUrl: id },
	})
	if (!data) {
		return (
			<>
				<div className="max-w-(--breakpoint-2xl) mx-auto w-full py-4 p-2">
					<Navbar />
					<NotFoundWeb />
				</div>
				<Footer />
			</>
		)
	}

	const getCacheData = await redis.get(id)

	if (getCacheData) {
		const jsonCacheData = JSON.parse(getCacheData || "").templateDiscordJson

		dataTemplate = jsonCacheData
	} else {
		dataTemplate = await getDataTemplate(data.link.split("https://discord.new/")[1], id)

		const timeLiveTemplate = differenceInDays(new Date(), new Date(dataTemplate.created_at))

		await redis.set(id, JSON.stringify({ templateDiscordJson: dataTemplate }), "EX", timeLiveTemplate > 5 ? 172800 : 21600)
	}

	return (
		<>
			<div className="flex">
				<LeftSidebar />
				<ChannelList dataTemplate={dataTemplate} slugUrl={data.slugUrl} />
				<div className="w-full h-full">
					<TopSidebarPreview />
					<ContentPreview />
				</div>
				<RightSidebarPreview dataTemplate={dataTemplate} />
			</div>
		</>
	)
}
