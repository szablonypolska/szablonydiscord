"use client"

import Image from "next/image"
import logo from "../../../public/logo.svg"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

export function Logo() {
	return (
		<Link href="/">
			<div className="flex items-center gap-2">
				<Image src={logo} alt="logo" />
				<h2 className="text-xl font-medium">SzablonyDiscord</h2>
			</div>
		</Link>
	)
}

export default function Navbar() {
	const pathname = usePathname()

	return (
		<nav className="bg-altBackgroundColor w-full z-20 relative border-borderColor border py-5 px-7 rounded-full mt-8 max-lg:py-4 shadow-[0_0_100px_10px_rgba(23,128,119,0.08)]">
			<div className="flex items-center justify-between max-lg:hidden">
				<Logo />
				<div className="">
					<ul className="flex items-center gap-5">
						<li className={`${pathname === "/builder" ? "py-2 px-6 bg-borderColor rounded-full" : ""}`}>
							<Link href="/builder">Builder</Link>
						</li>
						<li className={`${pathname === "/templates" ? "py-2 px-6 bg-borderColor rounded-full" : ""}`}>
							<Link href="/templates">Szablony</Link>
						</li>
						<li>
							<Link href="https://szablonydiscord.pl/api/docs">API</Link>
						</li>
						<li className={`${pathname === "/offers" ? "py-2 px-6 bg-borderColor rounded-full" : ""}`}>
							<Link href="/offers">Oferta</Link>
						</li>
					</ul>
				</div>
				<div className="">
					<Link href="https://szablonydiscord.pl/register">Zarejestruj się</Link>
					<Link href="/login" className="ml-5 bg-primaryColor py-3 px-5 rounded-full">
						Logowanie
					</Link>
				</div>
			</div>
			<div className="max-lg:block lg:hidden">
				<div className="flex items-center justify-between">
					<Logo />

					<Menu className="w-8 h-8" />
				</div>
			</div>
		</nav>
	)
}
