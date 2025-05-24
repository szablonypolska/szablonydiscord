import { FileText, Shield, ChevronRight, Scale } from "lucide-react"
import SidebarBuilderMaterialsFooter from "./sidebarBuilderMaterialsFooter"

export default function SidebarBuilderMaterials() {
	return (
		<div className="flex flex-col sticky top-0 bg-boxColor w-[22rem] lg:h-screen border-r border-borderColor px-4 py-5 shrink-0 max-lg:static max-lg:w-full">
			<div className="flex items-center gap-3  ">
				<FileText className="w-10 h-10 text-primaryColor" />
				<div className="">
					<h1 className="text-lg font-medium">Materiały</h1>
					<p className="text-sm text-textColor">Gotowe materiały dla serwera</p>
				</div>
			</div>
			<div className=" mt-8 lg:flex-grow">
				<div className="">
					<p className="text-textColor font-medium text-sm">Zasady i regulaminy</p>
					<button className="bg-primaryColor p-3 py-3.5  opacity-90 flex items-center justify-between  gap-3 rounded-xl my-3 transition-all hover:opacity-100 w-full">
						<div className="flex items-center gap-3 text-left">
							<Shield />
							<div className="">
								<p className="text-sm font-medium">Regulamin</p>
								<p className="text-textColor text-xs mt-1">Podstawowe zasady serwera</p>
							</div>
						</div>
						<ChevronRight className="w-5 h-5" />
					</button>
					<button className="bg-borderColor p-3 py-3.5  opacity-90 flex items-center justify-between  gap-3 rounded-xl my-3 transition-all hover:opacity-100 w-full">
						<div className="flex items-center gap-3 text-left">
							<Scale />
							<div className="">
								<p className="text-sm font-medium">Taryfikator kar</p>
								<p className="text-textColor text-xs mt-1">System kar i konsekwencji</p>
							</div>
						</div>
						<ChevronRight className="w-5 h-5" />
					</button>
				</div>
				<div className="mt-5">
					<p className="text-textColor font-medium text-sm">Informacje prawne</p>
					<button className="bg-borderColor p-3 py-3.5  opacity-90 flex items-center justify-between  gap-3 rounded-xl my-3 transition-all hover:opacity-100 w-full">
						<div className="flex items-center gap-3 text-left">
							<Shield />
							<div className="">
								<p className="text-sm font-medium">Regulamin</p>
								<p className="text-textColor text-xs mt-1">Podstawowe zasady serwera</p>
							</div>
						</div>
						<ChevronRight className="w-5 h-5" />
					</button>
				</div>
			</div>
			<SidebarBuilderMaterialsFooter />
		</div>
	)
}
