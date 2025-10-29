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
import WalletPopup from "./wallet/walletPopup"
import clsx from "clsx"
import React from "react"

export default function Sidebar() {
	const pathname = usePathname()
	const { data: session } = useSession()
	const { showSidebar } = useDashboardContext()

	const optionGlobal: { name: string; icon: React.ElementType; path: string; include: string }[] = [
		{
			name: "Api Menagement",
			icon: Key,
			path: "/dashboard",
			include: "api",
		},
		{
			name: "Konto",
			icon: User,
			path: "/dashboard/account",
			include: "account",
		},
		{
			name: "Szablony",
			icon: FileCode2,
			path: "/dashboard/templates",
			include: "templates",
		},
	]

	const optionAdmin: { name: string; icon: React.ElementType; path: string; include: string }[] = [
		{
			name: "Admin Panel",
			icon: Shield,
			path: "/dashboard/admin/users",
			include: "admin/users",
		},
	]

	return (
		<>
			<WalletPopup />
			<div className={`fixed top-0 left-0 w-full h-full  backdrop-blur-[2px] transition-opacity duration-300 ease-in-out z-10 ${showSidebar ? "max-lg:block lg:hidden" : "hidden"}`}></div>
			<div className={`flex flex-col bg-sidebar-color border-r-2 border-border-color h-screen ${showSidebar ? "w-[18rem]" : "w-20 max-lg:w-0 max-lg:overflow-hidden"} transition-all duration-300 max-lg:absolute lg:relative  z-20  `}>
				<Link href="/" className={`flex items-center gap-4 px-3 h-16 ${!showSidebar && "justify-center max-lg:justify-start"}`}>
					<Image src={logo} alt="logo storny szablonydiscord" />
					<h2 className={`${showSidebar ? "block" : "hidden max-lg:block"} text-xl`}>SzablonyDiscord</h2>
				</Link>

				<div className="w-full h-0.5 bg-border-color"></div>
				<div className={`flex flex-col ${!showSidebar && "items-center max-lg:items-start"}  gap-3 mt-5 grow w-full px-3`}>
					<p className="px-2 text-silver-color uppercase text-sm truncate w-11/12">wszystko</p>
					{optionGlobal.map(option => {
						const Icon = option.icon

						return (
							<div className="w-full" key={option.name}>
								<Link href={option.path}>
									<div className={clsx("px-2 w-full rounded-lg py-2.5 flex items-center gap-4 text-[17px]", { "bg-gradient-to-r from-primary-color to-primary-color/70   text-white": pathname === option.path || pathname.includes(option.include), "text-silver-color hover:bg-border-color": !(pathname === option.path || pathname.includes(option.include)) })}>
										<Icon size={showSidebar ? "23" : "30"} />
										<p className={`${showSidebar ? "block" : "hidden max-lg:block"}`}>{option.name}</p>
									</div>
								</Link>
							</div>
						)
					})}

					<p className={`px-2 text-silver-color uppercase text-sm mt-5 ${!showSidebar && "text-center px-0 max-lg:text-start"}`}>admin</p>
					<div className="">
						{optionAdmin.map(option => {
							const Icon = option.icon

							return (
								<div className="w-full" key={option.name}>
									<Link href={option.path}>
										<div className={clsx("px-2 w-full rounded-lg py-2.5 flex items-center gap-4 text-[17px]", { "bg-gradient-to-r from-primary-color to-primary-color/70   text-white": pathname === option.path || pathname.includes(option.include), "text-silver-color hover:bg-border-color": !(pathname === option.path || pathname.includes(option.include)) })}>
											<Icon size={showSidebar ? "23" : "30"} />
											<p className={`${showSidebar ? "block" : "hidden max-lg:block"}`}>{option.name}</p>
										</div>
									</Link>
								</div>
							)
						})}
					</div>
				</div>
				{showSidebar && (
					<div className="flex flex-col border border-border-color p-5 mx-3 my-4 rounded-lg relative">
						<div className="flex items-center gap-2 absolute -top-3 bg-primary-dark px-4 py-1 rounded-full w-fit border border-border-color text-primary-color">
							<Shield className="w-4 h-4" />
							<span className="text-xs">Premium</span>
						</div>
						<div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none z-10">
							<div className="absolute right-2 top-10 bg-primary-color w-12 h-12 blur-3xl"></div>
						</div>
						<p className="font-semibold mb-1.5 mt-1  z-20">Szablony premium</p>
						<span className="text-sm text-text-color z-20">Przejdź do szablony premium i wykorzystaj pełen potencjał</span>

						<Link href="/offers" className="flex items-center justify-center  bg-primary-color w-full rounded-full h-7.5 mt-2.5 ">
							Kup teraz
						</Link>
					</div>
				)}
				<div className="w-full">
					<div className="w-full h-0.5 bg-border-color"></div>
					<div className="flex justify-between items-center gap-2 p-3">
						{showSidebar && (
							<div className="flex items-center gap-2">
								<Image src={session?.user.image || DiscordUserAvatar} width={40} height={40} className="rounded-full" alt="user avatar" />
								<div className="flex flex-col max-w-full">
									<p className="truncate">{session?.user.name}</p>
									<span className="text-text-color truncate w-32 overflow-hidden block">{session?.user.email}</span>
								</div>
							</div>
						)}
						<Button className="hover:bg-border-color rounded-lg px-2" onPress={() => signOut({ callbackUrl: "/login" })}>
							<LogOut className="text-silver-color" />
						</Button>
					</div>
				</div>
			</div>
		</>
	)
}
