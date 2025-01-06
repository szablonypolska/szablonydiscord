"use client"

import { Button } from "@nextui-org/button"
import { p } from "framer-motion/client"
import React, { useEffect, useRef, useState } from "react"

interface Type {
	modal: boolean
	setModal: React.Dispatch<React.SetStateAction<boolean>>
	status: boolean
}

interface TypeData {
	hour: string
	minute: string
	seconds: string
}

export default function Modals({ modal, setModal, status }: Type) {
	const newRef = useRef<HTMLDivElement>(null)
	const [data, setData] = useState<TypeData>({ hour: "0", minute: "0", seconds: "0" })

	const scanTime = () => {
		const date = new Date()
		const getHour = date.getHours()
		const getMinutes = date.getMinutes()
		const getSeconds = date.getSeconds()
		const hoursToScan = 24 - getHour - 1
		const minutes = 60 - getMinutes - 1
		const seconds = 60 - getSeconds

		setData({
			hour: hoursToScan.toString().padStart(2, "0"),
			minute: minutes.toString().padStart(2, "0"),
			seconds: seconds.toString().padStart(2, "0"),
		})
	}

	useEffect(() => {
		if (modal) document.body.style.overflowY = "hidden"

		const interval = setInterval(() => {
			scanTime()
		}, 1000)

		return () => {
			document.body.style.overflowY = "scroll"
			clearInterval(interval)
		}
	}, [modal])

	useEffect(() => {
		const changeVisibleModal = (e: MouseEvent) => {
			if (newRef.current && !newRef.current.contains(e.target as Node)) {
				setModal(false)
			}
		}

		document.addEventListener("mousedown", changeVisibleModal)
		return () => {
			document.removeEventListener("mousedown", changeVisibleModal)
		}
	}, [setModal])

	return (
		<>
			<div
				className={`  fixed   top-0   left-0   w-full   h-full   z-50   backdrop-blur-[2px]   transition-opacity   duration-300   ease-in-out  ${modal ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}></div>

			<div
				ref={newRef}
				className={` fixed  top-1/2  left-1/2 -translate-x-1/2 -translate-y-1/2 w-96  p-5 z-50  rounded-xl  max-md:w-11/12  bg-boxColor border  border-borderColor transition-all  duration-300  ease-in-out  origin-center  transform ${modal ? "opacity-100 scale-100" : "opacity-0 scale-90"} `}>
				<div className="flex items-center justify-between">
					<p className="text-xl">System skanowania</p>
					<Button className="material-symbols-outlined p-1 rounded-full" onPress={() => setModal(false)}>
						close
					</Button>
				</div>
				<div className="mt-5">
					<p>
						Skanowanie szablonów odbywa się codziennie w godzinach nocnych (00:00) i trwa tyle aż wszystkie szablony
						zostaną przeskanowane (około 1/2 godziny).
					</p>
					<div className="mt-4">
						<p className="font-semibold">Aktualne skanowanie</p>
						{!status && <p>Aktualne skanowanie szablonów trwa.</p>}
						{status && (
							<p>
								Rozpocznie się za: {data.hour}:{data.minute}:{data.seconds} (automatycznie)
							</p>
						)}
					</div>
				</div>
				<Button className="w-full px-4 py-1 bg-primaryColor mt-5 rounded-lg" onPress={() => setModal(false)}>
					Zamknij
				</Button>
			</div>
		</>
	)
}
