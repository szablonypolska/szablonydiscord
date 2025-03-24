import Footer from "@/components/client/footer"
import Navbar from "@/components/client/navbar"
import NotFoundWeb from "@/components/client/notFound"
import ChannelList from "@/components/client/preview/channelListPreview"
import ContentPreview from "@/components/client/preview/contentPreview"
import LeftSidebar from "@/components/client/preview/leftSidebarPreview"
import RightSidebarPreview from "@/components/client/preview/rightSidebarPreview"
import TopSidebarPreview from "@/components/client/preview/topSidebarPreview"
import getDataTemplate from "@/lib/templates/getData"
import { prisma } from "@repo/db"

export default async function LoadPreviewData({ id }: { id: string }) {
	const data = await prisma.templates.findUnique({
		where: { slugUrl: id },
	})

	if (!data) {
		return (
			<>
				<div className="max-w-screen-2xl mx-auto w-full py-4 p-2">
					<Navbar />
					<NotFoundWeb />
				</div>
				<Footer />
			</>
		)
	}

	const dataTemplate = await getDataTemplate(data.link.split("https://discord.new/")[1])

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
