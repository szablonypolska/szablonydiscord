import Image from "next/image"
import logo from "../../../public/logo.svg"
import Link from "next/link"

export function Logo() {
	return (
		<div className="flex items-center gap-2">
			<Image src={logo} alt="logo" />
			<h2 className="text-xl font-medium">SzablonyDiscord</h2>
		</div>
	)
}

export default function Navbar() {
	return (
		<nav className="bg-altBackgroundColor w-full z-20 relative border-borderColor border py-5 px-7 rounded-full mt-8 max-lg:py-4">
			<div className="flex items-center justify-between max-lg:hidden">
				<Logo />
				<div className="">
					<ul className="flex items-center gap-5">
						<li className=" py-2 px-4 bg-borderColor rounded-full">Skanowanie</li>
						<li>
							<Link href="https://szablonydiscord.pl/templates">Szablony</Link>
						</li>
						<li>
							<Link href="https://szablonydiscord.pl/api/docs">API</Link>
						</li>
						<li>
							<Link href="https://szablonydiscord.pl">Home</Link>
						</li>
					</ul>
				</div>
				<div className="">
					<Link href="https://szablonydiscord.pl/register">Zarejestruj się</Link>
					<Link href="https://szablonydiscord.pl/login" className="ml-5 bg-primaryColor py-3 px-5 rounded-full">
						Logowanie
					</Link>
				</div>
			</div>
			<div className="max-lg:block lg:hidden">
				<div className="flex items-center justify-between">
					<Logo />
					<button className="material-symbols-outlined text-4xl">menu</button>
				</div>
			</div>
		</nav>
	)
}
