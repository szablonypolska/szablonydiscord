import { DiscordTemplate } from "../../interfaces/templates/common"
import { Roles } from "@/components/interfaces/templates/common"
import { Shield } from "lucide-react"

export default function RightSidebarPreview({ dataTemplate }: { dataTemplate: DiscordTemplate }) {
	return (
		<div className="bg-altBackgroundColor h-screen  w-[18rem] flex-shrink-0 transition-all  max-lg:w-0">
			<div className="flex items-center  gap-2 h-16 border-b border-b-borderColor p-3"></div>
			<div className="flex flex-col gap-2 p-3 px-4  h-[calc(100vh-4rem)] scrollbar scrollbar-thumb-altBorderColor scrollbar-track-borderColor  overflow-y-scroll">
				{dataTemplate.serialized_source_guild.roles.reverse().map((el: Roles) => {
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
