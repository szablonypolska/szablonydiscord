"use client"

import gsap from "gsap"
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
	const widthNumber = active ? (error ? 0 : width) : 0

	useEffect(() => {
		gsap.to(animation.current, {
			width: `${widthNumber}%`,
			duration: 0.5,
			ease: "power2.out",
		})
	}, [width, active])

	return (
		<div className="mb-5">
			<div className="flex items-center  gap-3">
				<div
					className={`flex items-center justify-center  ${error ? "bg-darknesErrorColor" : active ? (success ? "bg-borderColor" : "bg-primaryDark") : "bg-borderColor text-textColor"}
 p-3 rounded-lg shrink-0`}>
					<Icon className={`w-5 h-5 ${error && "text-errorColor"} ${success && "text-primaryColor"}`} />
				</div>
				<div className="">
					<p className={`font-medium text-sm ${!active && "text-darkGray"} ${error && "text-errorColor"} `}>{title}</p>
					<span className={`text-xs  ${error ? "text-red-400" : "text-textColor"}`}>{error ? "Wystąpił błąd, spróbuj ponownie pozniej" : description}</span>
				</div>
			</div>
			<div className="mt-3">
				<div className="w-full bg-boxColorDashboard h-1.5 rounded-full">
					<div className="bg-primaryColor h-full rounded-full" ref={animation} style={{ width: `0%` }}></div>
				</div>
			</div>
		</div>
	)
}
