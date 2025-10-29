import { Bot } from "lucide-react"
import SidebarFooter from "./sidebarFooter"
import BuilderStageSteps from "./steps/BuilderStageSteps"

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
				<BuilderStageSteps />
			</div>
			<SidebarFooter />
		</div>
	)
}
