"use client"
import { connectSocketBackend } from "@/lib/socket"
import { useEffect } from "react"
import { Toaster, toast } from "sonner"

export default function GlobalToaster() {
	const socket = connectSocketBackend()

	useEffect(() => {
		socket.on("info", message => {
			console.log(message)
			if (message.action == "create") {
				toast.message("Szablon serwera został dodany", {
					description: `ID szablony: ${message.templateId}, ${message.dateCreate}`,
					className: "bg-box-color border border-border-color text-white",
				})
			}

			if (message.action == "delete") {
				toast.info("Szablon serwera został usunięty z naszej bazy.", {
					className: "bg-box-color border border-border-color text-white",
				})
			}
		})
	}, [socket])

	return (
		<>
			<Toaster />
		</>
	)
}
