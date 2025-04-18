"use client"

import { SessionProvider } from "next-auth/react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function SeesionWrapper({ children }: { children: React.ReactNode }) {
	gsap.registerPlugin(useGSAP, ScrollTrigger)

	return <SessionProvider>{children}</SessionProvider>
}
