import ContentBuilderMaterials from "@/components/client/builder/materials/content"
import SidebarBuilderMaterials from "@/components/client/builder/materials/sidebarBuilderMaterials"
import TopSidebarBuilderMaterials from "@/components/client/builder/materials/topSidebarBuilderMaterials"

export default async function BuilderMaterialsDashboard() {
	return (
		<div className="flex w-full max-lg:flex-col">
			<SidebarBuilderMaterials />
			<div className="flex flex-col w-full">
				<TopSidebarBuilderMaterials />
				<div className="p-5">
					<ContentBuilderMaterials />
				</div>
			</div>
		</div>
	)
}
