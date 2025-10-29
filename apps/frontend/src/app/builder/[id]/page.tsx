import MenagePreview from "@/components/client/builder/panel/preview/menagePreview"
import SidebarBuilder from "@/components/client/builder/panel/sidebar"
import TopSidebarBuilder from "@/components/client/builder/panel/topSidebar"

export default async function BuilderDashboard() {
	return (
		<>
			<div className="max-lg:flex max-lg:flex-col grid grid-cols-[22rem_1fr] w-full lg:h-screen max-lg:grid-cols-1 max-lg:grid-rows-[auto_1fr] z-[-1] ">
				<SidebarBuilder />
				<div className="flex flex-col scrollbar scrollbar-thumb-alt-border-color scrollbar-track-border-color  overflow-y-auto">
					<TopSidebarBuilder />
					<div className="p-5 flex-1">
						<div className="flex flex-col bg-box-color rounded-lg border border-border-color p-8 h-full">
							<MenagePreview />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
