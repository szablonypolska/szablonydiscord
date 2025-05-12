import AnalysisAiPreview from "./steps/analysisAiPreview"
import ConfigureServerPreview from "./steps/configureServerPreview"
import CreateRoles from "./steps/createRoles"

export default function LivePreview() {
	return (
		<div className="p-5 ">
			<div className="flex flex-col gap-10 bg-boxColor w-full  rounded-lg border  border-borderColor p-5 pb-10 max-h-[calc(100vh-6rem)] scrollbar scrollbar-thumb-altBorderColor scrollbar-track-borderColor  overflow-y-scroll ">
				<AnalysisAiPreview />
				<ConfigureServerPreview />
				<CreateRoles />
			</div>
		</div>
	)
}
