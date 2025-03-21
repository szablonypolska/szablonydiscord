"use client"

import { useDashboardContext } from "@/context/DashboardContext"
import { Button } from "@nextui-org/button"
import { X } from "lucide-react"
import { isToday, isYesterday } from "date-fns"
import { Notification } from "../../../interfaces/common"
import NotificationGroup from "./notificationsGroup"
import NotificationsError from "./notificationsError"

interface NotificationsGrouped {
	today: Notification[]
	yesterday: Notification[]
	older: Notification[]
}

export default function NotificationsSidebar() {
	const { user, notification: isNotificationVisible, toggleViewNotification } = useDashboardContext()

	const groupedNotifications = user.notification.reduce<NotificationsGrouped>(
		(acc, current) => {
			const date = current.dateAdd ? new Date(current.dateAdd) : new Date()
			if (isToday(date)) {
				acc.today.push(current)
			} else if (isYesterday(date)) {
				acc.yesterday.push(current)
			} else {
				acc.older.push(current)
			}
			return acc
		},
		{ today: [], yesterday: [], older: [] }
	)

	return (
		<>
			<div
				className={`fixed top-0 left-0 w-full h-full z-40 backdrop-blur-[3px] transition-opacity duration-300 ease-in-out ${
					isNotificationVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
				}`}
			/>

			<div
				className={`fixed top-0 right-0 h-full bg-sidebarColor border-l-2 border-l-borderColor transition-all ${isNotificationVisible ? "w-[28rem] max-md:w-11/12" : "w-0"} overflow-hidden flex flex-col z-50`}>
				<div className="flex items-center justify-between p-5">
					<div>
						<h2 className="text-xl">Powiadomienia</h2>
						<p className="mt-1 text-silverColor">Tutaj zobaczysz swoje powiadomienia</p>
					</div>
					<Button className="px-1" onPress={toggleViewNotification}>
						<X />
					</Button>
				</div>

				<div className="w-full h-[2px] bg-borderColor" />

				{groupedNotifications.today.length === 0 && groupedNotifications.yesterday.length === 0 && groupedNotifications.older.length === 0 && <NotificationsError />}

				<div className="flex-grow overflow-y-auto">
					<NotificationGroup title="dzisiaj" notifications={groupedNotifications.today} />
					<NotificationGroup title="wczoraj" notifications={groupedNotifications.yesterday} />
					<NotificationGroup title="starsze" notifications={groupedNotifications.older} />
				</div>

				<div className="w-full h-[2px] bg-borderColor" />
				<div className="p-5">
					<Button className="w-full bg-boxColor rounded-xl">Zobacz wszystkie</Button>
				</div>
			</div>
		</>
	)
}
