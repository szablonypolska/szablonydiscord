import MenagePreview from "@/components/client/builder/details/preview/menagePreview"
import SidebarBuilder from "@/components/client/builder/details/sidebar"
import TopSidebarBuilder from "@/components/client/builder/details/topSidebar"

export default async function BuilderDashboard() {
	return (
		<div className="flex w-full max-lg:flex-col overflow-x-hidden">
			<SidebarBuilder />
			<div className="flex flex-col w-[calc(100%-22rem)]">
				<TopSidebarBuilder />
				<div className="p-5 w-full max-lg:w-full">
					<div className="flex flex-col  bg-boxColor  rounded-lg border  border-borderColor p-8  w-full ">
						<MenagePreview />
					</div>
				</div>
			</div>
		</div>
	)
}
