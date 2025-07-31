import { DiscordTemplate } from "../../interfaces/templates/common"
import { Roles } from "@/components/interfaces/templates/common"
import { Shield } from "lucide-react"

export default function RightSidebarPreview({ dataTemplate }: { dataTemplate: DiscordTemplate }) {
	return (
		<div className="bg-alt-background-color h-screen  w-[20rem] shrink-0 transition-all  max-lg:w-0 overflow-hidden">
			<div className="flex items-center  gap-2 h-16 border-b border-b-border-color p-3"></div>
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
