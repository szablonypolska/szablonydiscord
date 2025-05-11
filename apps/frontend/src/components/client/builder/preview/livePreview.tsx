import AnalysisAiPreview from "./steps/analysisAiPreview"
import ConfigureServerPreview from "./steps/configureServerPreview"

export default function LivePreview() {
	return (
		<div className="flex flex-col gap-10 bg-boxColor w-full rounded-lg border  border-borderColor p-5 pb-10">
			<AnalysisAiPreview />
			<ConfigureServerPreview />
		</div>
	)
}
