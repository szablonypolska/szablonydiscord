import { Hash, Shield } from "lucide-react"
import { useGlobalContext } from "@/context/GlobalContext"
import clsx from "clsx"

export default function TopSidebarOnMobile({ name }: { name: string }) {
	const { dispatch, state } = useGlobalContext()

	return (
		<div className={clsx("lg:hidden flex items-center justify-between h-16 border-b border-border-color p-5 z-20", state.viewChannelPreview ? "bg-alt-background-color" : "bg-background")}>
			<h2 className="text-lg font-medium truncate">{name}</h2>
			<div className="flex items-center gap-2">
				<button
					className={clsx("flex items-center justify-center rounded-lg w-8 h-10 cursor-pointer z-10", state.viewChannelPreview ? "bg-primary-color" : "bg-border-color")}
					onClick={() => {
						dispatch({ type: "SET_VIEW_CHANNEL_PREVIEW", payload: !state.viewChannelPreview })
						dispatch({ type: "SET_VIEW_ROLES_PREVIEW", payload: false })
					}}>
					<Hash className="w-5 h-5" />
				</button>
				<button
					className={clsx("flex items-center justify-center rounded-lg w-8 h-10 cursor-pointer z-10", state.viewRolesPreview ? "bg-primary-color" : "bg-border-color")}
					onClick={() => {
						dispatch({ type: "SET_VIEW_ROLES_PREVIEW", payload: !state.viewRolesPreview })
						dispatch({ type: "SET_VIEW_CHANNEL_PREVIEW", payload: false })
					}}>
					<Shield className="w-5 h-5" />
				</button>
			</div>
		</div>
	)
}
