"use client"

import { ShiningText } from "@/components/ui/shining-text"
import gsap from "gsap"
import { Loader2 } from "lucide-react"
import React, { useEffect, useRef } from "react"

interface Props {
	Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
	title: string
	description: string
	width: number
	active: boolean
	success: boolean
	error: boolean
}

export default function Progress({ Icon, title, description, width, active, success, error }: Props) {
	const animation = useRef<HTMLDivElement>(null)
	const widthNumber = active ? (error ? 100 : width) : 0

	useEffect(() => {
		gsap.to(animation.current, {
			width: `${widthNumber}%`,
			duration: 0.5,
			ease: "power2.out",
		})
	}, [width, active, widthNumber])

	return (
		<div className="mb-5">
			<div className="flex items-center  gap-3">
				<div
					className={`flex items-center justify-center  ${error ? "bg-darknes-error-color" : active ? (success ? "bg-border-color" : "bg-primary-dark") : "bg-border-color text-text-color"}
 p-3 rounded-lg shrink-0`}>
					{active && !error && !success ? <Loader2 className="w-5 h-5 animate-spin" /> : <Icon className={`w-5 h-5 ${error && "text-error-color"} ${success && "text-primary-color"}`} />}
				</div>
				<div className="">
					<p className={`font-medium text-sm ${!active && "text-dark-gray"} ${error && "text-error-color"} `}>{active && !error && !success ? <ShiningText text={title} /> : title}</p>
					<span className={`text-xs  ${error ? "text-red-400" : "text-text-color"}`}>{error ? "Wystąpił błąd, spróbuj ponownie pozniej" : description}</span>
				</div>
			</div>
			<div className="mt-3">
				<div className="w-full bg-box-color-dashboard h-[0.30rem] rounded-full">
					<div className={`${error ? "bg-error-color" : "bg-primary-color"} h-full rounded-full`} ref={animation} style={{ width: `0%` }}></div>
				</div>
			</div>
		</div>
	)
}
