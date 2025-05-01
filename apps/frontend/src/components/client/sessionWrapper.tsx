"use client"

import { SessionProvider } from "next-auth/react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ChatProvider } from "@/context/ChatContext"

export default function SeesionWrapper({ children }: { children: React.ReactNode }) {
	gsap.registerPlugin(useGSAP, ScrollTrigger)

	return (
		<ChatProvider>
			<SessionProvider>{children}</SessionProvider>
		</ChatProvider>
	)
}
