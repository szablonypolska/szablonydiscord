
import { ChatProvider } from "@/context/ChatContext"
import { CartProvider } from "@/context/CartContext"
import { SettingsProvider } from "@/context/SettingsContext"
import { SocketProvider } from "@/features/socketContext"
import { GlobalProvider } from "@/context/GlobalContext"
import { User } from "@/components/interfaces/common"

export default function InnerWrapper({ children, initialUser }: { children: React.ReactNode; initialUser: User | null }) {


	return (
		<SocketProvider>
			<ChatProvider>
				<CartProvider>
					<SettingsProvider>
						<GlobalProvider initialUser={initialUser}>{children}</GlobalProvider>
					</SettingsProvider>
				</CartProvider>
			</ChatProvider>
		</SocketProvider>
	)
}

// import { useSession } from "next-auth/react"
// import { ChatProvider } from "@/context/ChatContext"
// import { CartProvider } from "@/context/CartContext"
// import { SettingsProvider } from "@/context/SettingsContext"
// import { SocketProvider } from "@/features/socketContext"
// import { GlobalProvider } from "@/context/GlobalContext"
// import { User } from "@/components/interfaces/common"

// export default function InnerWrapper({ children, initialUser }: { children: React.ReactNode; initialUser: User | null }) {
// 	const { data: session } = useSession()

// 	return (
// 		<SocketProvider>
// 			<ChatProvider userId={session?.user.id || ""}>
// 				<CartProvider>
// 					<SettingsProvider>
// 						<GlobalProvider initialUser={initialUser}>{children}</GlobalProvider>
// 					</SettingsProvider>
// 				</CartProvider>
// 			</ChatProvider>
// 		</SocketProvider>
// 	)
// }
