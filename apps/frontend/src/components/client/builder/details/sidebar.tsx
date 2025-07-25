import { Bot } from "lucide-react"
import AnalysisAi from "./steps/analysisAi"
import ConfigureServer from "./steps/configureServer"
import CreateRoles from "./steps/createRoles"
import CreateCategory from "./steps/createCategory"
import CreateChannels from "./steps/createChannels"
import SidebarFooter from "./sidebarFooter"
import Authentication from "./steps/authentication"

export default function SidebarBuilder() {
	return (
		<div className="flex flex-col sticky top-0 left-0 bg-box-color w-88 lg:h-screen border-r border-border-color px-4 py-5 shrink-0 max-lg:static max-lg:w-full">
			<div className="flex items-center gap-3  ">
				<Bot className="w-10 h-10 text-primary-color" />
				<div className="">
					<h1 className="text-lg font-medium">Builder AI</h1>
					<p className="text-sm text-text-color">Budowanie szablonu...</p>
				</div>
			</div>
			<div className=" mt-8 lg:grow">
				<AnalysisAi />
				<Authentication />
				<ConfigureServer />
				<CreateRoles />
				<CreateCategory />
				<CreateChannels />
			</div>
			<SidebarFooter />
		</div>
	)
}
