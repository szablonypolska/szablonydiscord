import { Mic, Headphones, Settings, ChevronDown } from "lucide-react"

export default function ChannelList() {
	return (
		<>
			<div className="flex flex-col bg-altBackgroundColor h-screen w-72 flex-shrink-0">
				<div className="flex items-center justify-between p-3 h-16 border-b border-borderColor">
					<p className="text-lg">Gaming community</p>
					<ChevronDown className="text-gray-300" />
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
