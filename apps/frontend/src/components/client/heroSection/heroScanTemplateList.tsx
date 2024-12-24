"use client"

import { motion, AnimatePresence } from "framer-motion"
import { connectSocket } from "@/socket"
import { useEffect, useState } from "react"

export default function ScanTemplateList(data: any) {
	interface Type {
		title: string
		id: number
		usage: number
		dateCreate: string
	}
	const [list, setList] = useState<Type[]>([])

	const addTemplate = (msg: Type) => {
		setList(prev => {
			const updatedList = [msg, ...prev]
			return updatedList.splice(0, 5)
		})
	}

	useEffect(() => {
		const socket = connectSocket()

		socket.on("message", message => {
			addTemplate(message)
		})
	}, [])

	console.log(`zwraaaaa`, data)

	return (
		<div className="absolute inset-0 z-10 bg-boxColor rounded-lg border border-borderColor p-5 overflow-hidden max-lg:relative max-md:w-full max-lg:w-full max-md:mb-20">
			<p className="mt-2">Ostatnie przeskanowane szablony</p>
			<div className="flex flex-col gap-3 mt-4">
				{list.map((element, index) => (
					<motion.div
						key={element.id || index}
						initial={{ opacity: 0, y: -50 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -50 }}
						transition={{ duration: 0.5 }}
						layout
						className="flex items-center gap-3 bg-altBackgroundColor border border-borderColor py-3 px-5 rounded-2xl">
						<div className="text-gray-300 w-full">
							<p>{element.title}</p>
							<div className="w-full flex items-center justify-between">
								<p className="font-semibold">{element.dateCreate}</p>
								<p className="font-semibold">{element.usage} użyć</p>
							</div>
						</div>
					</motion.div>
				))}
			</div>
		</div>
	)
}
