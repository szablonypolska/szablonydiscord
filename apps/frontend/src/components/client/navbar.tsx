"use client"

import Image from "next/image"
import logo from "../../../public/logo.svg"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, SparkleIcon, ChevronRight, LayoutTemplate, Code, Store, LogIn, ShoppingCart } from "lucide-react"
import { Button } from "@nextui-org/button"
import { Dispatch, SetStateAction, useRef, useState } from "react"
import { useOnClickOutside } from "usehooks-ts"
import { useEffect } from "react"
import { useCartContext } from "@/context/CartContext"
import { AnimatePresence } from "framer-motion"
import { motion } from "framer-motion"

export function Logo({ fontSize, imageSize }: { fontSize?: string; imageSize?: string }) {
	return (
		<Link href="/">
			<div className="flex items-center gap-2">
				<Image src={logo} alt="logo" className={imageSize} />
				<h2 className={`font-medium ${fontSize ? fontSize : "text-xl"}`}>SzablonyDiscord</h2>
			</div>
		</Link>
	)
}

function NavbarElement({ active, noActive }: { active?: string; noActive?: string }) {
	const pathname = usePathname()
	return (
		<ul className="flex items-center gap-5">
			<li className={`${pathname === "/builder" ? `${active ? active : "py-3 px-5"} bg-border-color rounded-full` : noActive || ""}`}>
				<Link href="/builder">Builder</Link>
			</li>
			<li className={`${pathname === "/templates" ? `${active ? active : "py-3 px-5"} bg-border-color rounded-full` : noActive || ""}`}>
				<Link href="/templates">Szablony</Link>
			</li>
			<li>
				<Link href="https://szablonydiscord.pl/api/docs">API</Link>
			</li>
			<li className={`${pathname === "/offers" ? `${active ? active : "py-3 px-5"} bg-border-color rounded-full` : noActive || ""}`}>
				<Link href="/offers">Oferta</Link>
			</li>
		</ul>
	)
}

function NavbarCart({ buttonStyle, iconStyle, iconTextStyle }: { buttonStyle?: string; iconStyle?: string; iconTextStyle?: string }) {
	const { cart, setViewCart } = useCartContext()

	return (
		<div className="flex items-center">
			<div className="relative cursor-pointer" onClick={() => setViewCart(true)}>
				<button className="cursor-pointer" onClick={() => setViewCart(true)}>
					<ShoppingCart className={iconStyle} />
				</button>
				<div className={`absolute -top-1.5 -right-1.5 ${iconTextStyle ? iconTextStyle : "w-5 h-5"} flex items-center justify-center rounded-full bg-primary-color`}>
					<p className="text-xs">{cart ? cart.length : 0}</p>
				</div>
			</div>
			<Link href="/login" className={`ml-5 ${buttonStyle ? buttonStyle : "py-3 px-5"} bg-primary-color  rounded-full`}>
				Logowanie
			</Link>
		</div>
	)
}

function NavbarMobile({ view, setView }: { view: boolean; setView: Dispatch<SetStateAction<boolean>> }) {
	const elementRef = useRef<HTMLDivElement | null>(null)

	const element = [
		{ icon: <SparkleIcon className="text-primary-color w-6 h-6" />, to: "builder", title: "Builder AI", description: "Stwórz własny szablon" },
		{ icon: <LayoutTemplate className="text-primary-color w-6 h-6" />, to: "templates", title: "Szablony", description: "Przeglądaj gotowe szablony" },
		{ icon: <Code className="text-primary-color w-6 h-6" />, to: "api", title: "API", description: "Dokumentacja dla developerów" },
		{ icon: <Store className="text-primary-color w-6 h-6" />, to: "offers", title: "Oferta", description: "Sklepik szablonowy" },
	]

	const handleClickOutside = () => {
		setView(false)
	}

	useOnClickOutside(elementRef as React.RefObject<HTMLElement>, handleClickOutside)

	return (
		<>
			{view && <div className="fixed w-full h-full top-0 left-0 z-100 backdrop-blur-xs"></div>}
			<div className={`fixed top-0 right-0 h-full transition-all ${view ? "w-1/2 max-md:w-9/12 max-sm:w-11/12" : "w-0"}  bg-box-color z-100 flex flex-col overflow-hidden`} ref={elementRef}>
				<div className="flex items-center justify-between py-5 px-8 max-sm:px-4">
					<Logo />
					<Button onPress={() => setView(!view)} className="cursor-pointer">
						<X className="w-7 h-7" />
					</Button>
				</div>
				<div className="w-full h-px bg-border-color rounded-full"></div>
				<div className="flex flex-col gap-5 py-5 px-8 grow max-sm:px-4">
					{element.map((el, index) => (
						<Link href={`/${el.to}`} key={index}>
							{" "}
							<button className="w-full p-2 max-sm:px-0 cursor-pointer">
								<div className="flex items-center justify-between w-full">
									<div className="flex items-center gap-3">
										<div className="bg-border-color p-2.5 rounded-lg w-fit">{el.icon}</div>
										<div className="text-left">
											<p className="font-medium">{el.title}</p>
											<p className="text-sm text-text-color">{el.description}</p>
										</div>
									</div>
									<ChevronRight className="w-4 h-4 text-text-color" />
								</div>
							</button>
						</Link>
					))}
					<div className="w-full h-px bg-border-color rounded-full mt-3"></div>
				</div>
				<div className="flex flex-col gap-5 py-5 px-8 max-sm:px-4">
					<Link href="/login">
						<Button className="bg-primary-color rounded-lg w-full py-6 cursor-pointer">
							<LogIn /> <span>Zaloguj się</span>
						</Button>
					</Link>
					<Link href="/register">
						<Button className="bg-border-color rounded-lg w-full py-6 cursor-pointer">Zarejestruj się</Button>
					</Link>
					<button>
						<ShoppingCart />
					</button>
				</div>
			</div>
		</>
	)
}

export default function Navbar() {
	const [view, setView] = useState<boolean>(false)
	const pathname = usePathname()

	useEffect(() => {
		setView(false)
	}, [pathname])

	return (
		<>
			<ScrollNavbar />
			<nav className="bg-alt-background-color w-full z-100 relative border-border-color border py-5 px-7 rounded-full mt-8 max-lg:py-4 shadow-[0_0_100px_10px_rgba(23,128,119,0.08)]">
				<div className="flex items-center justify-between max-lg:hidden">
					<Logo />
					<div className="">
						<NavbarElement />
					</div>
					<NavbarCart />
				</div>
				<div className="max-lg:block lg:hidden">
					<div className="flex items-center justify-between">
						<Logo />

						<button onClick={() => setView(!view)} className="cursor-pointer">
							<Menu className="w-8 h-8" />
						</button>
					</div>
				</div>
			</nav>
			<NavbarMobile view={view} setView={setView} />
		</>
	)
}

export function ScrollNavbar() {
	const [visible, setVisible] = useState<boolean>(false)
	const [scrollY, setScrollY] = useState<number>(0)

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY

			if (currentScrollY > 130) {
				if (currentScrollY < scrollY) {
					setVisible(true)
				} else {
					setVisible(false)
				}
			} else {
				setVisible(false)
			}
			setScrollY(currentScrollY)
		}

		window.addEventListener("scroll", handleScroll, { passive: true })
		return () => window.removeEventListener("scroll", handleScroll)
	}, [scrollY])

	return (
		<>
			<AnimatePresence>
				{visible && (
					<motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className=" fixed top-0 left-0 z-[100] bg-alt-background-color/95 p-3  border-b border-border-color w-full max-lg:hidden">
						<div className="flex justify-between max-w-(--breakpoint-2xl) mx-auto px-7">
							<Logo fontSize="text-lg" imageSize="w-6 h-6" />
							<NavbarElement active="py-1 px-4 text-sm" noActive="text-sm" />
							<NavbarCart buttonStyle="py-1 px-4 text-sm" iconStyle="w-5 h-5" iconTextStyle="w-4 h-4" />
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}
