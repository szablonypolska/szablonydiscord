"use client"

import { useSession } from "next-auth/react"
import { ChatProvider } from "@/context/ChatContext"
import { CartProvider } from "@/context/CartContext"
import { SettingsProvider } from "@/context/SettingsContext"

export default function InnerWrapper({ children }: { children: React.ReactNode }) {
	const { data: session } = useSession()

	return (
		<ChatProvider userId={session?.user.id || ""}>
			<CartProvider>
				<SettingsProvider>{children}</SettingsProvider>
			</CartProvider>
		</ChatProvider>
	)
}
