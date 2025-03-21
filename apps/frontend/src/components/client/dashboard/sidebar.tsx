"use client"

import Image from "next/image"
import logo from "../../../../public/logo.svg"
import { Button } from "@nextui-org/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Key, User, FileCode2, Shield, LogOut } from "lucide-react"
import { useSession, signOut } from "next-auth/react"
import DiscordUserAvatar from "../../../../public/discordUserAvatar.jpg"
import { useDashboardContext } from "@/context/DashboardContext"

export default function Sidebar() {
	const pathname = usePathname()
	const { data: session } = useSession()
	const { showSidebar } = useDashboardContext()

	return (
		<>
			<div className={`fixed top-0 left-0 w-full h-full  backdrop-blur-[2px] transition-opacity duration-300 ease-in-out z-10 ${showSidebar ? "max-lg:block lg:hidden" : "hidden"}`}></div>
			<div
				className={`flex flex-col bg-sidebarColor border-r-2 border-borderColor h-screen ${showSidebar ? "w-[17rem]" : "w-20 max-lg:w-0 max-lg:overflow-hidden"} transition-all duration-300 max-lg:absolute  z-20  `}>
				<Link href="/" className={`flex items-center gap-4 px-3 h-16 ${!showSidebar && "justify-center max-lg:justify-start"}`}>
					<Image src={logo} alt="logo storny szablonydiscord" />
					<h2 className={`${showSidebar ? "block" : "hidden max-lg:block"} text-xl`}>SzablonyDiscord</h2>
				</Link>

				<div className="w-full h-0.5 bg-borderColor"></div>
				<div className={`flex flex-col ${!showSidebar && "items-center max-lg:items-start"}  gap-3 mt-5 flex-grow w-full px-3`}>
					<p className="px-2 text-silverColor uppercase text-sm truncate w-11/12">wszystko</p>
					<div className="w-full">
						<Link href="/dashboard">
							<div
								className={`${pathname === "/dashboard" ? "bg-primaryColor text-white" : "text-silverColor hover:bg-borderColor"} px-2 w-full rounded-lg py-2 flex ${!showSidebar && "justify-center max-lg:justify-start"}  items-center gap-4 text-lg`}>
								<Key size={showSidebar ? "25" : "30"} />
								<p className={`${showSidebar ? "block" : "hidden max-lg:block"}`}>Api Menagement</p>
							</div>
						</Link>
					</div>
					<div className="">
						<Link href="/dashboard/profile">
							<div
								className={`${pathname === "/dashboard/profile" ? "bg-primaryColor text-white" : "text-silverColor hover:bg-borderColor"} px-2 w-full rounded-lg py-2 flex ${!showSidebar && "justify-center max-lg:justify-start"}  items-center gap-4 text-lg`}>
								<User size={showSidebar ? "25" : "30"} />
								<p className={`${showSidebar ? "block" : "hidden max-lg:block"}`}>Publiczny profil</p>
							</div>
						</Link>
					</div>
					<div className="">
						<Link href="/dashboard/templates">
							<div
								className={`${pathname === "/dashboard/templates" ? "bg-primaryColor text-white" : "text-silverColor hover:bg-borderColor"} px-2 w-full rounded-lg py-2 flex ${!showSidebar && "justify-center"}  items-center gap-4 text-lg`}>
								<FileCode2 size={showSidebar ? "25" : "30"} />
								<p className={`${showSidebar ? "block" : "hidden max-lg:block"}`}>Szablony</p>
							</div>
						</Link>
					</div>
					<p className={`px-2 text-silverColor uppercase text-sm mt-5 ${!showSidebar && "text-center px-0 max-lg:text-start"}`}>admin</p>
					<div className="">
						<Link href="/dashboard/admin">
							<div
								className={`${pathname === "/dashboard/admin" ? "bg-primaryColor text-white" : "text-silverColor hover:bg-borderColor"} px-2 w-full rounded-lg py-2 flex ${!showSidebar && "justify-center"}  items-center gap-4 text-lg`}>
								<Shield size={showSidebar ? "25" : "30"} />
								<p className={`${showSidebar ? "block" : "hidden max-lg:block"}`}>Admin Panel</p>
							</div>
						</Link>
					</div>
				</div>
				<div className="w-full">
					<div className="w-full h-0.5 bg-borderColor"></div>
					<div className="flex justify-between items-center gap-2 p-3">
						{showSidebar && (
							<div className="flex items-center gap-2">
								<Image src={session?.user.image || DiscordUserAvatar} width={40} height={40} className="rounded-full" alt="user avatar" />
								<div className="flex flex-col max-w-full">
									<p className="truncate">{session?.user.name}</p>
									<span className="text-textColor truncate w-32 overflow-hidden block">{session?.user.email}</span>
								</div>
							</div>
						)}
						<Button className="hover:bg-borderColor rounded-lg px-2" onPress={() => signOut({ callbackUrl: "/login" })}>
							<LogOut className="text-silverColor" />
						</Button>
					</div>
				</div>
			</div>
		</>
	)
}
