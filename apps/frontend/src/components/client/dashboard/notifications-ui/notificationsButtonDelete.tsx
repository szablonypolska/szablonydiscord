import { X } from "lucide-react"
import { User } from "@/components/interfaces/common"
import deleteNotification from "@/lib/dasboard/notification/deleteNotification"
import { Dispatch } from "react"
import { GlobalAction } from "@/components/interfaces/global/common"

export function NotificationsButtons({ id, isRead, user, dispatch }: { id: number; isRead: boolean; user: User; dispatch: Dispatch<GlobalAction> }) {
	const handleDelete = async () => {
		try {
			const data = await deleteNotification(user.userId, id)

			if (!data.ok) return

			dispatch({
				type: "SET_USER",
				payload: {
					...user,
					notification: user.notification.filter(n => {
						return n.id !== id
					}),
				},
			})
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div className="flex items-center gap-0.5">
			{!isRead && <div className="w-2 h-2 bg-primary-color rounded-full"></div>}
			<button
				className="cursor-pointer p-1 rounded-lg hover:bg-border-color"
				onClick={e => {
					e.stopPropagation()
					handleDelete()
				}}>
				<X className="w-3.5 h-3.5 text-text-color" />
			</button>
		</div>
	)
}
