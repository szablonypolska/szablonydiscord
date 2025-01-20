import { Button } from "@nextui-org/button"
import { MessageSquare, ChevronLeft, Bell } from "lucide-react"
import Link from "next/link"

export default function ApiSettingsNotifications() {
	return (
		<>
			<div className="flex items-center gap-3">
				<Link href="/dashboard" className="hover:bg-borderColor p-2 rounded-lg">
					<ChevronLeft />
				</Link>
				<h1 className="text-2xl font-semibold">Zarządzanie kluczem API</h1>
			</div>
			<div className="bg-sidebarColor p-5 border border-borderColor rounded-xl mt-7">
				<div className="flex items-center gap-3">
					<MessageSquare className="text-primaryColor" />
					<h2 className="text-lg font-medium">Powiadomienia</h2>
				</div>
				<div className="bg-boxColor p-5 mt-5 rounded-lg">
					<div className="flex items-center gap-3">
						<div className="bg-darknesPrimaryColor w-fit p-3 rounded-lg">
							<Bell className="text-primaryColor" />
						</div>
						<div className="">
							<p>Discord Webhok</p>
							<p className="text-silverColor text-sm">Otrzymuj powiadomienia na Discorda!</p>
						</div>
					</div>
					<div className="mt-5">
						<input
							type="text"
							className="w-full bg-sidebarColor focus:ring-1 focus:ring-primaryColor focus:outline-none border border-borderColor rounded-xl p-3"
							placeholder="https://discord.com/api/webhooks/..."
						/>
						<div className="flex items-center gap-3 my-5">
							<Button className="border border-primaryColor text-primaryColor bg-darknesPrimaryColor font-medium rounded-xl px-5">Przekroczenie limitu</Button>
							<Button className="bg-borderColor text-silverColor rounded-xl px-5">Błędy API</Button>
							<Button className="bg-borderColor text-silverColor rounded-xl px-5">Nowe requesty</Button>
						</div>
					</div>
					<div className="w-full h-0.5 bg-borderColor"></div>
					<div className="mt-5">
						<p className="font-medium">Wygląd powiadomień</p>
						<div className="">
							<input type="color" defaultValue="#00796b" className="h-9 w-9 rounded bg-sidebarColor border border-sidebarColor cursor-pointer" />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
