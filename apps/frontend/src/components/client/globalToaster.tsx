"use client"
import { useEffect } from "react"
import { Toaster, toast } from "sonner"

export default function GlobalToaster() {
	useEffect(() => {
		const interval = setInterval(() => {
			toast.message("Został dodany nowy szablon serwera", {
				description: "ID: 7549385734985, Data: 06.01.2024",
				className: "bg-boxColor border border-borderColor text-white",
			})
		}, 3000)
	}, [])
	return (
		<>
			<Toaster />
		</>
	)
}
