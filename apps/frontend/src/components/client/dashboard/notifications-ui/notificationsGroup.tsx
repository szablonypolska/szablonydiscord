import ErrorCard from "./cards/error"
import WarningCard from "./cards/warning"
import SuccessCard from "./cards/success"

import { Notification } from "../../../interfaces/common"

interface NotificationGroupProps {
	title: string
	notifications: Notification[]
}

const renderNotificationCard = (notification: Notification, index: number) => {
	switch (notification.type) {
		case "success":
			return <SuccessCard item={notification} key={notification.id || index} />
		case "error":
			return <ErrorCard item={notification} key={notification.id || index} />
		case "warning":
			return <WarningCard item={notification} key={notification.id || index} />
		default:
			return null
	}
}

export default function NotificationGroup({ title, notifications }: NotificationGroupProps) {
	if (!notifications.length) return null

	return (
		<>
			<p className="px-5 my-5 uppercase text-silver-color text-sm">
				{title} ({notifications.length})
			</p>
			<div className="flex flex-col items-center gap-5 px-5">{notifications.map((notification, index) => renderNotificationCard(notification, index))}</div>
		</>
	)
}
