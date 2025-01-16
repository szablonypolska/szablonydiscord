"use client"

import { Button } from "@nextui-org/button"
import { Home, ChevronRight, ChevronLeft, UsersRound, Bell, Settings } from "lucide-react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { useSession, signOut } from "next-auth/react"
import DiscordUserAvatar from "../../../../public/discordUserAvatar.jpg"
import { DashboardContext } from "@/context/DashboardContext"
import { useContext } from "react"

export default function TopSidebar() {
	const pathname = usePathname()
	const { data: session } = useSession()
	const context = useContext(DashboardContext)

	if (!context) {
		throw new Error("")
	}

	const { toggleView } = context

	return (
		<>
			<div className="flex items-center justify-between px-10 bg-sidebarColor h-16">
				<div className="flex items-center gap-5  h-full">
					<div className="flex items-center">
						<Button className="hover:bg-borderColor hover:text-primaryColor px-2 rounded-lg" onPress={toggleView}>
							<ChevronLeft size="25" />
						</Button>
					</div>
					<div className="flex items-center gap-4 ml-4 mr-3">
						<Home size="16" color="#9ca3af" />
						<ChevronRight size="14" color="#9ca3af" />
						<p className="font-medium text-lg">{pathname.split("/dashboard")[1] === "" ? "Home" : pathname.split("/dashboard")[1]}</p>
					</div>
					<div className="h-3/6 w-0.5 bg-borderColor"></div>
					<div className="flex items-center gap-3 p-2 px-3 bg-altBackgroundColor border border-borderColor rounded-lg hover:border-primaryColor transition-all ml-3">
						<div className="relative">
							<div className="absolute inset-0 animate-ping w-3 h-3 bg-primaryColor opacity-75 rounded-full"></div>
							<div className="relative w-3 h-3 bg-primaryColor rounded-full"></div>
						</div>
						<p className="text-sm">Wszystkie systemy dzialaja</p>
					</div>
				</div>
				<div className="flex items-center gap-3 h-16">
					<div className="flex items-center gap-3 bg-altBackgroundColor border border-borderColor p-2 px-3 rounded-lg hover:border-primaryColor group">
						<UsersRound className="text-white group-hover:text-primaryColor transition-colors duration-200" size="20" />
						<div className="flex items-center gap-2">
							<p className="text-sm max-2xl:hidden">Użytkownicy online:</p>
							<p className="text-sm ">542</p>
						</div>
					</div>
					<Button className="hover:bg-borderColor px-2 rounded-lg">
						<Bell />
					</Button>
					<Button className="hover:bg-borderColor px-2 rounded-lg">
						<Settings />
					</Button>
					<div className="h-3/6 w-0.5 bg-borderColor"></div>
					<div className="flex items-center gap-3 pl-2">
						<div className="relative">
							<Image src={session?.user.image || DiscordUserAvatar} width={0} height={0} alt="user avatar" className="w-10 h-10 rounded-full" />
							<div className="absolute left-7 bottom-0.5 w-2 h-2 bg-green-500 rounded-full outline outline-3 outline-black"></div>
						</div>
						<div className="flex flex-col">
							<p>{session?.user.name}</p>
							<span className="text-sm text-silverColor">Aktywny</span>
						</div>
					</div>
				</div>
			</div>
			<div className="w-full h-0.5 bg-borderColor"></div>
		</>
	)
}
