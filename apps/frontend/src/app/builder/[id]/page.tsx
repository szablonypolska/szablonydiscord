import SidebarBuilder from "@/components/client/builder/details/sidebar"
import TopSidebarBuilder from "@/components/client/builder/details/topSidebar"
import PreviewTemplate from "@/components/client/builder/details/preview/previewTemplate"

export default async function BuilderDashboard() {
	return (
		<div className="flex w-full max-lg:flex-col">
			<SidebarBuilder />
			<div className="flex flex-col w-full">
				<TopSidebarBuilder />
				<div className="p-5">
					<div className="flex flex-col  bg-boxColor w-full  rounded-lg border  border-borderColor p-8  ">
						<PreviewTemplate />
					</div>
				</div>
			</div>
		</div>
	)
}
