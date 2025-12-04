"use client"

import { SessionProvider } from "next-auth/react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import InnerWrapper from "./innerWrapper"
import { User } from "@/components/interfaces/common"

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function SeesionWrapper({ children, initialUser }: { children: React.ReactNode; initialUser: User | null }) {
	return (
		<SessionProvider>
			<InnerWrapper initialUser={initialUser}>{children}</InnerWrapper>
		</SessionProvider>
	)
}
