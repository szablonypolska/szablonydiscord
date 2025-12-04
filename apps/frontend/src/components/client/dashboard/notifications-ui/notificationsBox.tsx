"use client"

import { useDashboardContext } from "@/context/DashboardContext"
import { CircleCheckBig, X, OctagonAlert } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { pl } from "date-fns/locale"
import { AnimatePresence } from "framer-motion"
import { motion } from "framer-motion"
import { useOnClickOutside } from "usehooks-ts"
import { useRef } from "react"
import { NotificationsButtons } from "./notificationsButtonDelete"
import markAsReady from "@/lib/dasboard/notification/markAsReady"
import { useGlobalContext } from "@/context/GlobalContext"

export default function NotificationsBox() {
	const { notification: isNotificationVisible, toggleViewNotification } = useDashboardContext()
	const { state, dispatch } = useGlobalContext()
	const ref = useRef<HTMLDivElement | null>(null)

	const selectIcon = (type: string) => {
		switch (type) {
			case "SUCCESS":
				return <CircleCheckBig className="w-5 h-5 text-primary-color" />
			case "ERROR":
				return <X className="w-5 h-5 text-error-color" />
			case "WARNING":
				return <OctagonAlert className="w-5 h-5 text-warning-color" />
			default:
				return null
		}
	}

	const handleClose = () => {
		toggleViewNotification()
	}

	const handleMarkAsRead = async (all: boolean, id?: number) => {
		try {
			const data = await markAsReady(state.user.userId, id, all)

			if (!data.ok) return

			if (all) {
				dispatch({
					type: "SET_USER",
					payload: {
						...state.user,
						notification: state.user.notification.map(n => {
							return {
								...n,
								isRead: true,
							}
						}),
					},
				})
			} else {
				dispatch({
					type: "SET_USER",
					payload: {
						...state.user,
						notification: state.user.notification.map(n => {
							if (n.id === id) {
								return {
									...n,
									isRead: true,
								}
							}
							return n
						}),
					},
				})
			}
		} catch (err) {
			console.log(err)
		}
	}

	useOnClickOutside(ref as React.RefObject<HTMLElement>, handleClose)

	return (
		<AnimatePresence>
			{isNotificationVisible && (
				<motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute right-0 top-12  w-[21rem] rounded-lg border border-border-color bg-box-color z-100" ref={ref}>
					<div className="flex items-center justify-between p-4 ">
						<h3 className="font-semibold">Powiadomienia</h3>
						<button className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer" onClick={() => handleMarkAsRead(true)}>
							<CircleCheckBig className="w-3 h-3" />
							<span>Przeczytane</span>
						</button>
					</div>
					<div className="w-full h-px bg-border-color rounded-full"></div>
					<div className="scrollbar scrollbar-thumb-alt-border-color scrollbar-track-border-color  overflow-y-auto max-h-96">
						{state.user.notification.length === 0 && <p className="text-text-color text-sm p-4">Brak nowych powiadomień</p>}
						{state.user &&
							state.user.notification.map(notification => (
								<div className="flex items-start gap-3 p-4 border-b border-border-color hover:bg-box-color-dashboard cursor-pointer" onClick={() => handleMarkAsRead(false, notification.id)} key={notification.id}>
									<div className="flex items-center justify-center bg-border-color w-9 h-9 rounded-full flex-shrink-0">{selectIcon(notification.type)}</div>
									<div className="flex flex-col">
										<div className="flex items-center justify-between gap-2 z-10">
											<p className="font-semibold text-sm">{notification.title}</p>
											<NotificationsButtons id={notification.id} isRead={notification.isRead} user={state.user} dispatch={dispatch} />
										</div>
										<span className="text-xs text-gray-300 my-1">{notification.description}</span>
										<span className="text-xs text-text-color/70"> {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true, locale: pl })}</span>
									</div>
								</div>
							))}
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
