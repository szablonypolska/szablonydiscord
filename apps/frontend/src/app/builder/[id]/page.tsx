import BuilderWrapper from "@/components/client/builder/builderWrapper"
import SidebarBuilder from "@/components/client/builder/details/sidebar"
import TopSidebarBuilder from "@/components/client/builder/details/topSidebar"
import LivePreview from "@/components/client/builder/details/preview/livePreview"
import { prisma } from "@repo/db"

interface Params {
	id: string
}

export default async function BuilderDashboard({ params }: { params: Promise<Params> }) {
	const { id } = await params

	const data = await prisma.generateStatus.findUnique({
		where: { sessionId: id },
		include: { roles: true, channel: true, category: true },
	})

	return (
		<BuilderWrapper id={id} data={data}>
			<div className="flex w-full max-lg:flex-col">
				<SidebarBuilder />
				<div className="flex flex-col w-full">
					<TopSidebarBuilder />
					<div className="">
						<LivePreview />
					</div>
				</div>
			</div>
		</BuilderWrapper>
	)
}
