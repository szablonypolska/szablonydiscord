import { BotIcon, X } from "lucide-react"

export default function HeaderSupportChat() {
	return (
		<>
			<div className="">
				<div className="flex justify-between  p-4">
					<div className="flex items-center gap-2">
						<div className="flex items-center justify-center bg-primaryColor w-10 h-10 rounded-full relative">
							<BotIcon />
							<div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full"></div>
						</div>
						<div className="flex flex-col">
							<p className="font-medium">Support</p>
							<span className="text-xs text-textColor ">Online • Odpowiedź ~15 min</span>
						</div>
					</div>
					<button>
						<X className="w-5 h-5" />
					</button>
				</div>
				<div className="w-full h-[1px] bg-borderColor"></div>
			</div>
		</>
	)
}
