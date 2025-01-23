"use client"

import { Button } from "@nextui-org/button"
import { MessageSquare, Bell } from "lucide-react"
import { useState } from "react"
import ApiSettingsVariables from "./apiVariables"
import { useDashboardContext } from "@/context/DashboardContext"
import { usePathname } from "next/navigation"

export default function ApiSettingsNotifications() {
	const [color, setColor] = useState<string>("#00796b")

	const pathname = usePathname()
	const { user } = useDashboardContext()

	return (
		<>
			<div className="bg-sidebarColor p-5 border border-borderColor rounded-xl mt-7">
				<div className="flex items-center gap-3">
					<MessageSquare className="text-primaryColor" />
					<h2 className="text-lg font-medium">Powiadomienia</h2>
				</div>
				<div className="bg-boxColor p-5 mt-5 rounded-lg">
					<div className="flex justify-between items-center">
						<div className="flex items-center gap-3">
							<div className="bg-darknesPrimaryColor w-fit p-3 rounded-lg">
								<Bell className="text-primaryColor" />
							</div>
							<div className="">
								<p>Discord Webhok</p>
								<p className="text-silverColor text-sm">Otrzymuj powiadomienia na Discorda!</p>
							</div>
						</div>
						<label className="inline-flex items-center cursor-pointer">
							<input type="checkbox" value="" className="sr-only peer" />
							<div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none  rounded-full peer dark:bg-silverColor peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-primaryColor"></div>
						</label>
					</div>
					<div className="mt-5 hidden">
						<div>
							<input
								type="text"
								className="w-full bg-sidebarColor focus:ring-1 focus:ring-primaryColor focus:outline-none border border-borderColor rounded-xl p-3"
								placeholder="https://discord.com/api/webhooks/..."
							/>
							<div className="flex items-center gap-3 my-5">
								<Button className="border border-primaryColor text-primaryColor bg-darknesPrimaryColor font-medium rounded-xl px-5">Nowy request</Button>
							</div>
						</div>
						<div className="w-full h-0.5 bg-borderColor"></div>
						<div className="mt-5">
							<p className="font-medium">Wygląd powiadomień</p>
							<div className="mt-3">
								<p className="text-silverColor text-sm">Kolor paska embeda</p>
								<div className="flex items-center gap-3 mt-3">
									<input type="color" value={color} onChange={e => setColor(e.target.value)} className="h-9 w-9 rounded bg-sidebarColor border border-sidebarColor cursor-pointer" />
									<input
										type="text"
										value={color}
										onChange={e => setColor(e.target.value)}
										className="bg-sidebarColor border border-borderColor h-9 p-3 w-32 rounded-xl focus:ring-1 focus:ring-primaryColor focus:outline-none"
									/>
								</div>
							</div>
							<div className="mt-5">
								<label htmlFor="title" className="text-silverColor">
									Tytuł powiadomienia
								</label>
								<input
									id="title"
									type="text"
									className="bg-sidebarColor border border-borderColor  p-3 mt-2 w-full rounded-xl focus:ring-1 focus:ring-primaryColor focus:outline-none"
									placeholder="np. Powiadomienia o limicie API dla ${name}"
								/>
							</div>
							<div className="mt-5">
								<label htmlFor="description" className="text-silverColor">
									Treść powiadomienia
								</label>
								<textarea
									id="description"
									rows={3}
									className="bg-sidebarColor border border-borderColor  p-3 mt-2 w-full rounded-xl focus:ring-1 focus:ring-primaryColor focus:outline-none"
									placeholder="np. Twój klucz ${name} osiągnął limit dzienny ${usageDailyPercent}%"
								/>
							</div>
						</div>
						<ApiSettingsVariables />
						<Button className="w-full bg-primaryColor rounded-xl  mt-5">Wyślij testowe powiadomienie</Button>
					</div>
				</div>
			</div>
		</>
	)
}
