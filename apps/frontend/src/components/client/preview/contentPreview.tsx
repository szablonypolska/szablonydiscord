import { MessageSquare, PlusCircle, LayoutGrid, Frown, Gift, Sticker, Plus, Gamepad2, Smile, Mic } from "lucide-react"

export default function ContentPreview() {
	return (
		<div className="flex flex-col h-[calc(100vh-4rem)]">
			<div className="flex flex-col items-center justify-center mt-14 text-center">
				<MessageSquare className="text-primary-color w-8 h-8" />
				<h1 className="font-semibold text-gray-400 my-2 text-lg">Witaj w podglądzie szablonu</h1>
				<p className=" text-gray-500">To jest tylko symulacaj szablonu, przyciski nie dzialaja</p>
			</div>
			<div className="grow "></div>
			<div className="w-full  p-3 px-5 max-lg:px-2">
				<div className="flex items-center gap-2">
					<div className="flex items-center justify-between bg-border-color w-full p-4 rounded-xl px-5 max-lg:hidden">
						<div className="flex gap-3">
							<PlusCircle className="text-gray-400" />
							<p className="text-gray-300 opacity-50">Napisz na # ogólny</p>
						</div>
						<div className="flex gap-4">
							<Gift className="text-gray-400" />
							<Sticker className="text-gray-400" />
							<Frown className="text-gray-400" />
						</div>
					</div>
					<div className="flex items-center gap-2 w-full lg:hidden">
						<div className="bg-border-color p-2 rounded-full w-10 h-10">
							<Plus className="text-gray-400" />
						</div>
						<div className="bg-border-color p-2 rounded-full w-10 h-10">
							<Gamepad2 className="text-gray-400" />
						</div>
						<div className="bg-border-color p-2 rounded-full w-10 h-10">
							<Gift className="text-gray-400" />
						</div>
						<div className="flex items-center justify-between bg-border-color rounded-full p-2 h-10 flex-1 min-w-0 px-3 max-sm:px-2">
							<p className="text-sm text-gray-500">Napisz na...</p>
							<div className="pl-2 pr-1">
								<Smile className=" text-gray-500" />
							</div>
						</div>
						<div className="bg-border-color p-2 rounded-full w-10 h-10">
							<Mic className="text-gray-400" />
						</div>
					</div>
					<div className="bg-border-color text-gray-400 p-4 rounded-xl max-lg:hidden">
						<LayoutGrid />
					</div>
				</div>
			</div>
		</div>
	)
}
