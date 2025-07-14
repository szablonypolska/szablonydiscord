import Link from "next/link"
import Image from "next/image"
import { Logo } from "./navbar"
import Discord from "../../../public/discord-white-icon.webp"
import { MapPin, Mail } from "lucide-react"

export default function Footer() {
	return (
		<footer className="bg-alt-background-color w-full p-5 mt-20 z-50">
			<div className="flex flex-col items-center max-w-(--breakpoint-2xl) mx-auto mt-10">
				<Logo />

				<ul className="flex items-center gap-5 mt-6">
					<li className=" py-2 px-4 ">Skanowanie</li>
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

				<div className="w-full mt-5 ">
					<div className="w-full h-0.5 bg-border-color"></div>
					<div className="flex justify-center gap-5 my-6 max-sm:flex-col max-sm:items-center">
						<div className="flex items-center gap-2">
							<Mail className="w-5 h-5 text-primary-color" />
							<p className="text-gray-300">szablonydiscord@gmail.com</p>
						</div>
						<div className="flex items-center gap-2">
							<MapPin className="w-5 h-5 text-primary-color" />
							<p className="text-gray-300">Polska</p>
						</div>
					</div>
					<div className="w-full h-0.5 bg-border-color"></div>
				</div>

				<div className="mt-10 w-full bg-box-color border border-border-color p-2 px-4 rounded-full flex justify-between items-center max-md:flex-col  max-md:rounded-lg max-md:relative">
					<div className="flex items-center gap-2 max-md:absolute max-md:-top-5">
						<div className="p-2.5 bg-primary-color w-fit rounded-full max-md:p-3.5">
							<Image src={Discord} alt="discord logo" className="w-5 max-md:w-6" />
						</div>
						<div className="p-2.5 bg-primary-color w-fit rounded-full max-md:p-3.5">
							<Image src={Discord} alt="discord logo" className="w-5 max-md:w-6" />
						</div>
						<div className="p-2.5 bg-primary-color w-fit rounded-full max-md:p-3.5">
							<Image src={Discord} alt="discord logo" className="w-5 max-md:w-6" />
						</div>
					</div>
					<p className="text-text-color max-md:mt-10 text-center">SzablonyDiscord wszystkie prawa zastrzeżone</p>
					<div className="flex items-center gap-3 text-text-color max-md:mt-5">
						<Link href="https://szablonydiscord/api/docs">API docs</Link>
						<p>|</p>
						<Link href="https://szablonydiscord/api/docs">Shizeclone</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}
