"use client"

import { useDashboardContext } from "@/context/DashboardContext"
import { Button } from "@nextui-org/button"
import { X, CircleCheckBig } from "lucide-react"

export default function NotificationsSidebar() {
	const { user, notification, toggleViewNotification } = useDashboardContext()
	console.log(user)
	return (
		<>
			<div className={`fixed top-0 right-0 h-full  bg-sidebarColor border-l-2 border-l-borderColor transition-all ${notification ? "w-[26rem]" : "w-0"} overflow-hidden flex flex-col z-50`}>
				<div className="flex items-center justify-between p-5">
					<div>
						<h2 className="text-xl">Powiadomienia</h2>
						<p className="mt-1 text-silverColor">Tutaj zobaczysz swoje powiadomienia</p>
					</div>
					<Button className="px-1" onPress={toggleViewNotification}>
						<X />
					</Button>
				</div>
				<div className="w-full h-[2px] bg-borderColor"></div>
				<div className="flex items-center gap-3 p-5 my-3">
					<div className="bg-boxColor p-3 border border-borderColor rounded-xl w-1/2">
						<p className="text-2xl">3</p>
						<p className="text-silverColor">Dzisiaj</p>
					</div>
					<div className="bg-boxColor p-3 border border-borderColor rounded-xl w-1/2">
						<p className="text-2xl">3</p>
						<p className="text-silverColor">Wszystkie</p>
					</div>
				</div>

				<div className="flex flex-col flex-grow items-center gap-5 px-5">
					{user.notification.map((el, index) => (
						<div className="flex items-start gap-3 bg-boxColorDashboard border-l-4 border-l-primaryColor rounded-xl px-4 py-3" key={el.id || index}>
							<div className="bg-darknesPrimaryColor w-fit p-2 rounded-xl">
								<CircleCheckBig className="text-primaryColor" />
							</div>
							<div className="">
								<p className="font-medium">{el.title}</p>
								<p className="text-silverColor  mt-1">{el.description}</p>
								<p className="mt-6 text-darkGray text-sm">13:40</p>
							</div>
						</div>
					))}
				</div>

				<div className="w-full h-[2px] bg-borderColor"></div>
				<div className="p-5">
					<Button className="w-full bg-boxColor rounded-xl">Zobacz wszystkie</Button>
				</div>
			</div>
		</>
	)
}
