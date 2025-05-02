"use client"

import { useSession } from "next-auth/react"
import { ChatProvider } from "@/context/ChatContext"

export default function InnerWrapper({ children }: { children: React.ReactNode }) {
	const { data: session } = useSession()

	return <ChatProvider userId={session?.user.id || ""}>{children}</ChatProvider>
}
