import { MessageSquare, PlusCircle, LayoutGrid, Frown, Gift, Sticker } from "lucide-react"

export default function ContentPreview() {
	return (
		<div className="flex flex-col h-[calc(100vh-4rem)]">
			<div className="flex flex-col items-center justify-center mt-14">
				<MessageSquare className="text-primaryColor w-8 h-8" />
				<h1 className="font-semibold text-gray-400 my-2 text-lg">Witaj w podglądzie szablonu</h1>
				<p className=" text-gray-500">To jest tylko symulacaj szablonu, przyciski nie dzialaja</p>
			</div>
			<div className="flex-grow "></div>
			<div className="w-full p-3 px-5">
				<div className="flex items-center gap-2">
					<div className="flex items-center justify-between bg-borderColor w-full p-4 rounded-xl px-5">
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
					<div className="bg-borderColor text-gray-400 p-4 rounded-xl">
						<LayoutGrid />
					</div>
				</div>
			</div>
		</div>
	)
}
