import PreviewTemplate from "./previewTemplate"

export default function LivePreview() {
	return (
		<div className="p-5 ">
			<div className="flex flex-col  bg-boxColor w-full  rounded-lg border  border-borderColor p-8  ">
				<PreviewTemplate />
			</div>
		</div>
	)
}
