import PreviewTemplate from "./previewTemplate"

export default function LivePreview() {
	return (
		<div className="p-5 ">
			<div className="flex flex-col gap-10 bg-boxColor w-full  rounded-lg border  border-borderColor p-8 pb-10 max-h-[calc(100vh-6rem)] ">
				<PreviewTemplate />
			</div>
		</div>
	)
}
