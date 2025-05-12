"use client"

import gsap from "gsap"
import { CheckCheck, Loader2, Shield } from "lucide-react"
import React from "react"

interface Props {
	Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
	title: string
	description: string
	loader: boolean
	active: boolean
	success: boolean
	data?: Data[]
}

interface Data {
	name: string
	color?: string
}

export default function LoaderPreview({ Icon, title, description, loader, active, success, data }: Props) {
	return (
		<div className="flex items-start gap-3">
			<div className={`${active ? (success ? "bg-borderColor" : "bg-primaryDark") : "bg-borderColor text-textColor"} p-2.5 rounded-lg w-fit`}>
				<Icon className={`${active ? "text-primaryColor " : "text-darkGray"}`} />
			</div>
			<div className="relative w-full">
				<p className={`font-medium ${!active && "text-darkGray"} `}>{title}</p>
				{data && (
					<div className="flex flex-col gap-3 mt-2">
						{data.map((el, index) => (
							<div className="flex items-center gap-2 bg-altBackgroundColor border border-borderColor w-full p-2 rounded-lg" key={index}>
								<Shield className="text-textColor" />
								<p className="">{el.name}</p>
							</div>
						))}
					</div>
				)}
				<div className={`flex items-center gap-2 text-textColor mt-1 transition-all overflow-hidden ${loader ? "h-5" : "h-0"}`}>
					<Loader2 className="w-4 h-4 animate-spin" />
					<p className="text-sm">{description}</p>
				</div>
				<div className={`flex items-center gap-2 text-textColor mt-1 transition-all overflow-hidden ${success ? "h-5" : "h-0"} `}>
					<CheckCheck className="w-4 h-4" />
					<p className="text-sm">Operacja przebiegła pomyślnie</p>
				</div>
			</div>
		</div>
	)
}
