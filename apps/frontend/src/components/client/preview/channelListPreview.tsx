import { Mic, Headphones, Settings, ChevronDown, Hash, Volume2, Plus, Users } from "lucide-react"
import { DiscordTemplate } from "../../interfaces/templates/common"
import { ChannelPermission } from "./visualization/channelPermissions"
import { Channel } from "@/components/interfaces/templates/common"
import Link from "next/link"

export default function ChannelList({ dataTemplate, slugUrl }: { dataTemplate: DiscordTemplate; slugUrl: string }) {
	const channelStyles: { [key: number]: string } = {
		0: "flex items-center px-2 my-1.5 mb-2  font-medium text-channelColor    hover:bg-borderColor  rounded-lg w-11/12 truncate", // Tekstowy
		2: "flex items-center  px-2 my-2 text-channelColor    hover:bg-borderColor  rounded-lg w-11/12 truncate", // Głosowy
		4: "flex items-center gap-1 font-bold text-sm uppercase mt-2  text-textColor hover:text-white w-11/12 truncate mb-1", // Kategoria
	}

	const channelIcons: { [key: number]: React.ReactNode } = {
		0: <Hash className="text-channelColor w-5 h-5 mr-1" />,
		2: <Volume2 className="text-channelColor w-5 h-5  mr-1" />,
		4: <ChevronDown className="text-channelColor w-3 h-3 mr-0.5" />,
		5: <ChannelPermission sizeHash={5} sizeLock={2} />,
	}

	return (
		<>
			<div className="flex flex-col bg-altBackgroundColor h-screen w-[20rem] flex-shrink-0 transition-all max-lg:w-0 overflow-hidden">
				<Link href={`/templates/${slugUrl}`}>
					<div className="flex items-center justify-between p-3 h-16 border-b border-borderColor">
						<p className="text-lg w-11/12 truncate">{dataTemplate.serialized_source_guild.name}</p>
						<ChevronDown className="text-gray-300" />
					</div>
				</Link>
				<div className="p-3 w-full scrollbar scrollbar-thumb-altBorderColor scrollbar-track-borderColor  overflow-y-scroll">
					{dataTemplate.serialized_source_guild.channels.map((el: Channel) => (
						<div className={`flex items-center   ${el.type !== 4 && "hover:bg-borderColor"}  rounded-lg group w-full`} key={el.id}>
							<div className={`w-full ${channelStyles[el.type]}`} key={el.id}>
								<span className="text-2xl text-channelColor material-symbols-outlined font-black">{el.type === 0 && el.permission_overwrites.length > 0 ? channelIcons[5] : channelIcons[el.type]}</span>
								{el.type === 4 && (
									<div className="flex items-center justify-between w-full">
										<p>{el.name}</p>
										<Plus className="w-4 h-4" />
									</div>
								)}
								{el.type !== 4 && (
									<div className="flex justify-between items-center w-full group">
										<p className="group-hover:max-w-[calc(100%-3rem)] group-hover:truncate">{el.name}</p>
										<div className="group-hover:flex gap-1  hidden w-[2rem]">
											<Users className="w-4 h-4" />
											<Settings className="w-4 h-4" />
										</div>
									</div>
								)}
							</div>
						</div>
					))}
				</div>
				<div className=" flex-grow"></div>
				<div className="flex justify-between bg-boxColor p-3 border-t border-borderColor">
					<div className="flex items-center gap-2">
						<div className="w-10 h-10 rounded-full bg-borderColor"></div>
						<div className="">
							<p>Użytkownik</p>
							<p className="text-textSpecial text-sm">#0000</p>
						</div>
					</div>
					<div className="flex items-center gap-3">
						<Mic className="w-5 h-5 text-gray-300 font-semibold" />
						<Headphones className="w-5 h-5 text-gray-300 font-semibold" />
						<Settings className="w-5 h-5 text-gray-300 font-semibold" />
					</div>
				</div>
			</div>
		</>
	)
}
