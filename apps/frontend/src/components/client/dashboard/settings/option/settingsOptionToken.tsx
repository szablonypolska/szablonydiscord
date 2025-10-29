"use client"

import { CircleAlert, Eye, EyeOff } from "lucide-react"
import { Button } from "@nextui-org/button"
import discordLogo from "../../../../../../public/discord-white-icon.webp"
import Image from "next/image"
import { useState } from "react"

export default function SettingsOptionToken() {
	const [showToken, setShowToken] = useState<boolean>(false)

	return (
		<div className="bg-sidebar-color/80 p-6 w-full">
			<div className="">
				<p className="text-lg font-medium">Intergracja</p>
				<span className="text-text-color text-sm">Połącz swoje konto z zewnętrznymi usługami</span>
			</div>
			<div className="mt-5 bg-box-color border border-border-color px-5 py-4 rounded-lg w-full">
				<div className="flex items-center gap-3">
					<div className="bg-primary-color p-3 rounded-lg w-fit flex-shrink-0">
						<Image src={discordLogo} alt="Discord Logo" className="w-6 h-6" />
					</div>
					<div className="flex flex-col">
						<p className="font-medium">Token discord</p>
						<span className="text-text-color text-sm mt-0.5">Wklej token aby uzyskać dostęp do wszystkich funkcji.</span>
					</div>
				</div>
				<div className="bg-background border border-border-color p-5 rounded-lg my-5">
					<p className="font-medium text-sm">Wklej token konta discord</p>
					<div className="relative mt-3">
						<input type={showToken ? "text" : "password"} placeholder="Wklej token discord" className="p-3 rounded-lg border border-border-color bg-box-color w-full  placeholder:font-normal place focus:ring-2 focus:ring-border-color outline-none" />
						<button className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" onClick={() => setShowToken(!showToken)}>
							{showToken ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
						</button>
					</div>
				</div>
				<Button className="bg-border-color w-full rounded-lg py-6 opacity-50">Połącz z discord</Button>
				<div className="flex items-center gap-3 mt-5 bg-primary-color/10 border border-primary-color p-3 rounded-lg">
					<div className="p-2 rounded-full bg-primary-color/30 w-fit ">
						<CircleAlert className="text-primary-color w-4 h-4" />
					</div>
					<p className="text-sm text-primary-color">Połączenie z Discord odblokowuje dodatkowe funkcje, takie jak builder AI i więcej</p>
				</div>
			</div>
		</div>
	)
}
