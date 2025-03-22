import { Plus } from "lucide-react"

export default function LeftSidebar() {
	return (
		<>
			<div className="bg-boxColor h-screen p-3 px-4  w-fit">
				<div className="flex items-center justify-center bg-primaryColor w-14 h-14 rounded-full">
					<p className="font-semibold text-lg">SD</p>
				</div>
				<div className="w-full h-0.5 bg-borderColor my-4 rounded-2xl"></div>
				<div className="flex items-center justify-center bg-borderColor w-14 h-14 rounded-full">
					<Plus className="text-primaryColor" />
				</div>
			</div>
		</>
	)
}
