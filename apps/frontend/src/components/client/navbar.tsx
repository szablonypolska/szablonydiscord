"use client"

import Image from "next/image"
import logo from "../../../public/logo.svg"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, SparkleIcon, ChevronRight, LayoutTemplate, Code, Store, LogIn } from "lucide-react"
import { Button } from "@nextui-org/button"
import { Dispatch, SetStateAction, useRef, useState } from "react"
import { useOnClickOutside } from "usehooks-ts"

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

function NavbarMobile({ view, setView }: { view: boolean; setView: Dispatch<SetStateAction<boolean>> }) {
	const elementRef = useRef<HTMLDivElement | null>(null)

	const element = [
		{ icon: <SparkleIcon className="text-primaryColor w-6 h-6" />, to: "builder", title: "Builder AI", description: "Stwórz własny szablon" },
		{ icon: <LayoutTemplate className="text-primaryColor w-6 h-6" />, to: "templates", title: "Szablony", description: "Przeglądaj gotowe szablony" },
		{ icon: <Code className="text-primaryColor w-6 h-6" />, to: "api", title: "API", description: "Dokumentacja dla developerów" },
		{ icon: <Store className="text-primaryColor w-6 h-6" />, to: "offers", title: "Oferta", description: "Sklepik szablonowy" },
	]

	const handleClickOutside = () => {
		setView(false)
	}

	useOnClickOutside(elementRef as React.RefObject<HTMLElement>, handleClickOutside)

	return (
		<>
			{view && <div className="fixed w-full h-full top-0 left-0 z-[100] backdrop-blur-sm"></div>}
			<div className={`fixed top-0 right-0 h-full transition-all ${view ? "w-1/2 max-md:w-9/12 max-sm:w-11/12" : "w-0"}  bg-boxColor z-[100] flex flex-col overflow-hidden`} ref={elementRef}>
				<div className="flex items-center justify-between py-5 px-8 max-sm:px-4">
					<Logo />
					<Button onPress={() => setView(!view)}>
						<X className="w-7 h-7" />
					</Button>
				</div>
				<div className="w-full h-[1px] bg-borderColor rounded-full"></div>
				<div className="flex flex-col gap-5 py-5 px-8 flex-grow max-sm:px-4">
					{element.map((el, index) => (
						<Link href={`/${el.to}`} key={index}>
							{" "}
							<button className="w-full p-2 max-sm:px-0">
								<div className="flex items-center justify-between w-full">
									<div className="flex items-center gap-3">
										<div className="bg-borderColor p-2.5 rounded-lg w-fit">{el.icon}</div>
										<div className="text-left">
											<p className="font-medium">{el.title}</p>
											<p className="text-sm text-textColor">{el.description}</p>
										</div>
									</div>
									<ChevronRight className="w-4 h-4 text-textColor" />
								</div>
							</button>
						</Link>
					))}
					<div className="w-full h-[1px] bg-borderColor rounded-full mt-3"></div>
				</div>
				<div className="flex flex-col gap-5 py-5 px-8 max-sm:px-4">
					<Link href="/login">
						<Button className="bg-primaryColor rounded-lg w-full py-6">
							<LogIn /> <span>Zaloguj się</span>
						</Button>
					</Link>
					<Link href="/register">
						<Button className="bg-borderColor rounded-lg w-full py-6">Zarejestruj się</Button>
					</Link>
				</div>
			</div>
		</>
	)
}

export default function Navbar() {
	const [view, setView] = useState<boolean>(false)
	const pathname = usePathname()

	return (
		<>
			<nav className="bg-altBackgroundColor w-full z-[100] relative border-borderColor border py-5 px-7 rounded-full mt-8 max-lg:py-4 shadow-[0_0_100px_10px_rgba(23,128,119,0.08)]">
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

						<button onClick={() => setView(!view)}>
							<Menu className="w-8 h-8" />
						</button>
					</div>
				</div>
			</nav>
			<NavbarMobile view={view} setView={setView} />
		</>
	)
}
