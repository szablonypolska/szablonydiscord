import { Button } from "@nextui-org/button"
import { Send } from "lucide-react"

export default function Chat() {
	const messages = [
		{
			permission: "admin",
			message: "Cześć! Jestem Marek i pomogę Ci z Twoim problemem. Proszę o chwilę cierpliwości podczas gdy analizuję Twoje zgłoszenie.",
		},
		{
			permission: "admin",
			message: "4324234gfsdogkd",
		},
		{
			permission: "user",
			message: "4324234gfsdogkd",
		},
		{
			permission: "user",
			message: "4324234gfsdogkd",
		},
		{
			permission: "user",
			message: "4324234gfsdogkd",
		},
		{
			permission: "user",
			message: "4324234gfsdogkd",
		},
		{
			permission: "system",
			message: "Admin TheProShizer przejął ticketa.",
		},
	]

	return (
		<div className="flex flex-col h-[26rem] w-full">
			<div className="flex-grow p-4 py-5 scrollbar scrollbar-thumb-altBorderColor scrollbar-track-borderColor  overflow-y-scroll">
				{messages.map((el, index) => (
					<div key={index}>
						{el.permission === "admin" && (
							<div className="flex flex-col bg-borderColor p-3  max-w-[80%] m rounded-bl-none rounded-xl mb-3">
								<p className="text-[0.75rem]">{el.message}</p>
								<span className="text-right text-textColor text-[0.60rem] mt-0.5">22:37</span>
							</div>
						)}
						{el.permission === "user" && (
							<div className="flex flex-col items-end w-full my-3">
								<div className="flex flex-col bg-primaryColor opacity-90 p-3  max-w-[80%] rounded-br-none rounded-xl">
									<p className="text-[0.75rem]">siemaneckzo huj</p>
									<span className="text-right text-textColor text-[0.60rem] mt-0.5">22:37</span>
								</div>
							</div>
						)}
						{el.permission === "system" && (
							<div className="flex  items-center w-full my-3">
								<div className="flex items-center gap-2 bg-boxColor px-3 py-1 rounded-full">
									<p className="text-textColor text-xs">{el.message}</p>
								</div>
							</div>
						)}
					</div>
				))}
			</div>

			<div className="w-full h-[1px] bg-borderColor"></div>
			<div className="flex items-center gap-2 p-4 py-5">
				<input type="text" className="bg-altBackgroundColor border border-borderColor w-full py-2 px-3 rounded-xl placeholder:text-sm focus:ring-1 focus:outline-none  focus:ring-primaryColor" placeholder="Wpisz coś..." />
				<Button className="bg-primaryColor px-3 py-1 rounded-lg">
					<Send />
				</Button>
			</div>
		</div>
	)
}
