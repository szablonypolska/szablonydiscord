"use client"

import { Button } from "@nextui-org/button"
import { Home, ChevronRight, ChevronLeft, UsersRound, Bell, Settings, WalletCards } from "lucide-react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { useSession } from "next-auth/react"
import DiscordUserAvatar from "../../../../public/discordUserAvatar.jpg"
import { useDashboardContext } from "@/context/DashboardContext"

export default function TopSidebar() {
	const pathname = usePathname()
	const { data: session } = useSession()
	const { user, toggleView, toggleViewNotification, showSidebar, numberPeopleOnline } = useDashboardContext()

	console.log(user.status)

	return (
		<>
			<div className="flex items-center justify-between px-10 bg-sidebarColor h-16 max-xl:px-5">
				<div className="flex items-center gap-5  h-full max-xl:gap-2">
					<div className="flex items-center">
						<Button className="hover:bg-borderColor hover:text-primaryColor px-2 rounded-lg" onPress={toggleView}>
							{showSidebar ? <ChevronLeft size="25" /> : <ChevronRight size="25" />}
						</Button>
					</div>
					<div className="flex items-center gap-4 ml-4 mr-3 max-lg:hidden">
						<Home size="16" color="#9ca3af" />
						<ChevronRight size="14" color="#9ca3af" />
						<p className="font-medium text-lg">{pathname.split("/dashboard")[1] === "" ? "Home" : pathname.split("/dashboard")[1]}</p>
					</div>
					<div className="h-3/6 w-0.5 bg-borderColor max-lg:hidden"></div>
					<div className="flex items-center gap-3 p-2 px-3 bg-altBackgroundColor border border-borderColor rounded-lg hover:border-primaryColor transition-all ml-3 max-lg:hidden">
						<WalletCards className="w-5 h-5 text-primaryColor" />
						<p className="text-sm max-xl:hidden">
							Stan portfela: <span>0,00 zł</span>
						</p>
						<p className="text-sm xl:hidden">Portfel: 0,00 zł</p>
					</div>
				</div>
				<div className="flex items-center gap-3 h-16">
					<div className="flex items-center gap-3 bg-altBackgroundColor border border-borderColor p-2 px-3 rounded-lg hover:border-primaryColor group max-lg:hidden">
						<UsersRound className="text-white group-hover:text-primaryColor transition-colors duration-200" size="20" />
						<div className="flex items-center gap-2">
							<p className="text-sm max-2xl:hidden">Użytkownicy online:</p>
							<p className="text-sm ">{numberPeopleOnline}</p>
						</div>
					</div>
					<div className="relative">
						<Button className="hover:bg-borderColor px-2 rounded-lg" onPress={toggleViewNotification}>
							<Bell />
						</Button>
						{user.notification.length > 0 && <div className="absolute top-1 right-0.5 w-2.5 h-2.5 bg-primaryColor rounded-full"></div>}
					</div>
					<Button className="hover:bg-borderColor px-2 rounded-lg">
						<Settings />
					</Button>
					<div className="h-3/6 w-0.5 bg-borderColor max-lg:hidden"></div>
					<div className="flex items-center gap-3 pl-2">
						<div className="relative">
							<Image src={session?.user.image || DiscordUserAvatar} width={0} height={0} alt="user avatar" className="w-10 h-10 rounded-full" />
							<div className={`absolute left-7 bottom-0.5 w-2 h-2 ${user.status ? "bg-green-500" : "bg-errorColor"} rounded-full outline outline-3 outline-black`}></div>
						</div>
						<div className="flex flex-col">
							<p>{session?.user.name}</p>
							<span className="text-sm text-silverColor">{user.status ? "Aktywny" : "Nieaktywny"}</span>
						</div>
					</div>
				</div>
			</div>
			<div className="w-full h-0.5 bg-borderColor"></div>
		</>
	)
}
