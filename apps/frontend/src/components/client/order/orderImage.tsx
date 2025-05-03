"use client"

import Image from "next/image"
import statusOne from "../../../../public/status/status-paid.svg"
import gsap from "gsap"
import { useEffect, useRef } from "react"

export default function OrderImage() {
	const animation = useRef<HTMLImageElement>(null)

	useEffect(() => {
		gsap.to(animation.current, {
			duration: 0.5,
			x: -10,
			opacity: 1,
		})
	}, [])

	return <Image src={statusOne} ref={animation} alt="order status" className="w-[35rem] h-[35rem] max-2xl:w-1/2 max-lg:hidden pointer-events-none opacity-0" priority />
}
