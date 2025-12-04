import { Plus } from "lucide-react"
import { useGlobalContext } from "@/context/GlobalContext"
import clsx from "clsx"

export default function LeftSidebar() {
	const { state } = useGlobalContext()

	return (
		<div className={clsx("flex flex-col items-center bg-box-color lg:h-screen max-lg:h-[calc(100% - 4rem)] p-3 px-4  w-24 transition-all  z-0", !state.viewChannelPreview && "max-lg:hidden")}>
			<div className="flex items-center justify-center bg-primary-color w-14 h-14 rounded-full cursor-not-allowed">
				<p className="font-semibold text-lg">SD</p>
			</div>
			<div className="w-full h-0.5 bg-border-color my-4 rounded-2xl"></div>
			<div className="flex items-center justify-center bg-border-color w-14 h-14 rounded-full cursor-not-allowed">
				<Plus className="text-primary-color" />
			</div>
		</div>
	)
}
