"use client"

import { useChatContext } from "@/context/ChatContext"
import { Button } from "@nextui-org/button"
import { CircleAlert, Loader2, MessagesSquare } from "lucide-react"

export default function ChatLoadStatus() {
	const { loading } = useChatContext()

	if (loading === "loading") {
		return (
			<div className="flex justify-center items-center absolute top-0 left-0 w-full h-full bg-alt-background-color z-50">
				<div className="flex flex-col items-center justify-center">
					<div className="relative">
						<div className="bg-border-color p-5 rounded-full w-fit">
							<MessagesSquare className="text-primary-color animate-pulse w-7 h-7" />
						</div>
						<div className="bg-border-color p-2 rounded-full h-fit absolute top-10 left-18">
							<Loader2 className="animate-spin w-3 h-3 text-primary-color" />
						</div>
					</div>
					<p className="mt-3 text-text-color text-sm">Ładowanie wiadomości..</p>
				</div>
			</div>
		)
	}

	if (loading === "error") {
		return (
			<div className="flex justify-center items-center absolute top-0 left-0 w-full h-full bg-alt-background-color z-50 px-4 py-5">
				<div className="flex flex-col items-center justify-center">
					<div className="bg-darknes-error-color p-4 rounded-full">
						<CircleAlert className="text-error-color w-8 h-8" />
					</div>
					<div className="text-center">
						<p className="font-medium text-lg mt-3 ">Wystąpił błąd z ładowaniem</p>
						<span className="mt-3 text-text-color text-sm">Podczas ładowania wiadomości wystąpił błąd, sprobuj pozniej wtedy kiedy bedzie wszystko dzialac..</span>
					</div>
					<Button className="bg-error-color w-full rounded-lg mt-5">Zamknij czat</Button>
				</div>
			</div>
		)
	}
}
