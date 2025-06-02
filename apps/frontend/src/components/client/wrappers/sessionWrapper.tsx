"use client"

import { SessionProvider } from "next-auth/react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import InnerWrapper from "./innerWrapper"

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function SeesionWrapper({ children }: { children: React.ReactNode }) {
	return (
		<SessionProvider>
			<InnerWrapper>{children}</InnerWrapper>
		</SessionProvider>
	)
}
