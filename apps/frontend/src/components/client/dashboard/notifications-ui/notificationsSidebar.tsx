"use client"

import { useDashboardContext } from "@/context/DashboardContext"
import { Button } from "@nextui-org/button"
import { X } from "lucide-react"
import SuccessCard from "./cards/success"
import ErrorCard from "./cards/error"
import WarningCard from "./cards/warning"

export default function NotificationsSidebar() {
	const { user, notification, toggleViewNotification } = useDashboardContext()
	console.log(user)
	return (
		<>
			<div
				className={`fixed top-0 left-0 w-full h-full z-40 backdrop-blur-[3px] transition-opacity duration-300 ease-in-out ${
					notification ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
				}`}></div>
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
						<p className="text-2xl">{user.notification.length}</p>
						<p className="text-silverColor">Wszystkie</p>
					</div>
				</div>

				<div className="flex flex-col flex-grow items-center gap-5 px-5">
					{user.notification.slice(0, 3).map((el, index) => {
						if (el.type === "success") return <SuccessCard item={el} key={el.id || index} />
						if (el.type === "error") return <ErrorCard item={el} key={el.id || index} />
						if (el.type === "warning") return <WarningCard item={el} key={el.id || index} />
					})}
				</div>

				<div className="w-full h-[2px] bg-borderColor"></div>
				<div className="p-5">
					<Button className="w-full bg-boxColor rounded-xl">Zobacz wszystkie</Button>
				</div>
			</div>
		</>
	)
}
