"use client"

import { DiscordTemplate } from "../../interfaces/templates/common"
import { Roles } from "@/components/interfaces/templates/common"
import { Search, Shield } from "lucide-react"
import { useGlobalContext } from "@/context/GlobalContext"
import clsx from "clsx"

export default function RightSidebarPreview({ dataTemplate }: { dataTemplate: DiscordTemplate }) {
	const { state } = useGlobalContext()

	return (
		<div className={clsx("bg-alt-background-color h-screen  w-[20rem] shrink-0 transition-all  max-lg:absolute max-lg:right-0 max-lg:w-full max-lg:h-[calc(100vh-4rem)] overflow-hidden", !state.viewRolesPreview && "max-lg:hidden")}>
			<div className="flex items-center  gap-2 h-16 border-b border-b-border-color p-3 max-lg:hidden ">
				<div className="flex items-center justify-between bg-box-color py-2.5 px-3 border border-border-color rounded-lg w-full opacity-80 cursor-not-allowed">
					<p className="text-xs text-gray-300 truncate">Wyszukaj {dataTemplate.serialized_source_guild.name}</p>
					<Search className="w-4 h-4" />
				</div>
			</div>
			<div className="flex flex-col gap-2 p-3 px-4  h-[calc(100vh-4rem)] scrollbar scrollbar-thumb-alt-border-color scrollbar-track-border-color  overflow-y-auto">
				{[...dataTemplate.serialized_source_guild.roles].reverse().map((el: Roles) => {
					const hexColor = `#${el.color.toString(16).padStart(6, "0")}`

					return (
						<div className="flex items-center gap-1  py-1 rounded-full" key={el.id}>
							<Shield style={{ color: hexColor }} />

							<p className="w-11/12 truncate font-semibold" style={{ color: hexColor }}>
								{el.name}
							</p>
						</div>
					)
				})}
			</div>
		</div>
	)
}
