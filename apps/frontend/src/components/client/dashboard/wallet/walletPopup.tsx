"use client"

import { Button } from "@nextui-org/button"
import { Wallet, X, CreditCard, Package } from "lucide-react"
import { useState } from "react"

export default function WalletPopup() {
	const [packages, setPackages] = useState<"custom" | "packagesList">("custom")

	return (
		<div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-box-color w-120 border border-border-color  rounded-lg z-50">
			<div className="flex items-center justify-between p-4">
				<div className="flex items-center gap-2">
					<Wallet className="text-primary-color" />
					<p className="font-medium">Stan portfela</p>
				</div>
				<button className="text-text-color">
					<X />
				</button>
			</div>
			<div className="w-full h-px bg-border-color"></div>
			<div className="p-4">
				<div className="bg-box-color border border-border-color p-4 rounded-lg">
					<p className="text-text-color text-sm">Aktualny stan</p>
					<div className="flex items-center gap-2 mt-1">
						<CreditCard className="text-primary-color" />
						<p className="text-xl font-bold">0,00 zł</p>
					</div>
				</div>
			</div>
			<div className="flex items-center w-full p-4">
				<div className="w-1/2 text-center">
					<button className={`font-semibold text-sm transition-all w-full ${packages === "custom" ? "text-primary-color" : "text-text-color hover:text-white"}`} onClick={() => setPackages("custom")}>
						Własna kwota
					</button>
					<div className={`w-full h-[2px]  mt-2 ${packages === "custom" ? "bg-primary-color" : "bg-border-color"}`}></div>
				</div>
				<div className="w-1/2 text-center">
					<button className={`font-semibold text-sm transition-all w-full ${packages === "packagesList" ? "text-primary-color" : "text-text-color hover:text-white"}`} onClick={() => setPackages("packagesList")}>
						Pakiety
					</button>
					<div className={`w-full h-[2px]  mt-2 ${packages === "packagesList" ? "bg-primary-color" : "bg-border-color"}`}></div>
				</div>
			</div>
			<div className="p-3"></div>
			<div className="p-4">
				<Button className="bg-primary-color w-full rounded-lg py-5.5">
					<Package className="w-4 h-4" />
					<span>Doładuj konto</span>
				</Button>
			</div>
		</div>
	)
}
