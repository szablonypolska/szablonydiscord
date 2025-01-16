"use client"

import Image from "next/image"
import logo from "../../../../public/logo.svg"
import { Button } from "@nextui-org/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Key, User, FileCode2, Shield, LogOut } from "lucide-react"
import { useSession, signOut } from "next-auth/react"
import { useContext, useState } from "react"
import DiscordUserAvatar from "../../../../public/discordUserAvatar.jpg"
import { DashboardContext } from "@/context/DashboardContext"

export default function Sidebar() {
	const pathname = usePathname()
	const { data: session } = useSession()
	const context = useContext(DashboardContext)

	if (!context) {
		throw new Error("wait")
	}

	const { showSidebar } = context

	return (
		<>
			<div className={`flex flex-col bg-sidebarColor border-r-2 border-borderColor h-screen ${showSidebar ? "w-[17rem]" : "w-20"} transition-all duration-300    `}>
				<Link href="/" className={`flex items-center gap-4 px-3 h-16 ${!showSidebar && "justify-center"}`}>
					<Image src={logo} alt="logo storny szablonydiscord" />
					{showSidebar && <h2 className="text-xl">SzablonyDiscord</h2>}
				</Link>

				<div className="w-full h-0.5 bg-borderColor"></div>
				<div className={`flex flex-col ${!showSidebar && "items-center"}  gap-3 mt-5 flex-grow w-full px-3`}>
					<p className="px-2 text-silverColor uppercase text-sm truncate w-11/12">wszystko</p>
					<div className="w-full">
						<Link href="dashboard/api">
							<div
								className={`${pathname === "/dashboard" ? "bg-primaryColor text-white" : "text-silverColor hover:bg-borderColor"} px-2 w-full rounded-lg py-2 flex ${!showSidebar && "justify-center"}  items-center gap-4 text-lg`}>
								<Key size={showSidebar ? "25" : "30"} />
								{showSidebar && <p>Api Menagement</p>}
							</div>
						</Link>
					</div>
					<div className="">
						<Link href="/dashboard/profile">
							<div
								className={`${pathname === "/dashboard/profile" ? "bg-primaryColor text-white" : "text-silverColor hover:bg-borderColor"} px-2 w-full rounded-lg py-2 flex ${!showSidebar && "justify-center"}  items-center gap-4 text-lg`}>
								<User size={showSidebar ? "25" : "30"} />
								{showSidebar && <p>Publiczny profil</p>}
							</div>
						</Link>
					</div>
					<div className="">
						<Link href="/dashboard/templates">
							<div
								className={`${pathname === "/dashboard/templates" ? "bg-primaryColor text-white" : "text-silverColor hover:bg-borderColor"} px-2 w-full rounded-lg py-2 flex ${!showSidebar && "justify-center"}  items-center gap-4 text-lg`}>
								<FileCode2 size={showSidebar ? "25" : "30"} />
								{showSidebar && <p>Szablony</p>}
							</div>
						</Link>
					</div>
					<p className={`px-2 text-silverColor uppercase text-sm mt-5 ${!showSidebar && "text-center px-0"}`}>admin</p>
					<div className="">
						<Link href="/dashboard/templates">
							<div
								className={`${pathname === "/dashboard/templates" ? "bg-primaryColor text-white" : "text-silverColor hover:bg-borderColor"} px-2 w-full rounded-lg py-2 flex ${!showSidebar && "justify-center"}  items-center gap-4 text-lg`}>
								<Shield size={showSidebar ? "25" : "30"} />
								{showSidebar && <p>Admin Panel</p>}
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
							<LogOut color="#9ca3af" />
						</Button>
					</div>
				</div>
			</div>
		</>
	)
}
