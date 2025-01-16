"use client"

import { motion, AnimatePresence } from "framer-motion"
import { connectSocket } from "@/socket"
import { useEffect, useState } from "react"
import heroDecoration from "../../../../../public/decorationElementHero.svg"
import Image from "next/image"
import CountUp from "react-countup"
import Modals from "./heroModal"

interface Type {
	title: string
	id: number
	usage: number
	dateCreate: string
	templateId: string
	waitElement?: number
}

interface Props {
	templates: Type[]
	status: boolean
}

export default function ScanTemplateList({ templates, status }: Props) {
	const [list, setList] = useState<Type[]>([])
	const [queueWait, setQueueWait] = useState<number>(0)
	const [queue, setQueue] = useState<number>(0)
	const [scanTemplate, setScanTemplate] = useState<number>(0)
	const [modal, setModal] = useState<boolean>(false)
	let id = 4

	const addTemplate = (msg: Type) => {
		setList(prev => {
			const updatedList = [msg, ...prev]
			setScanTemplate(prev => prev + 1)
			return updatedList.splice(0, 5)
		})
	}

	useEffect(() => {
		const socket = connectSocket()
		let element = 0
		let id = 0

		setList(templates.slice(0, 4))

		socket.on("message", message => {
			addTemplate(message)
			setQueueWait(message.waitElement)
			element = message.waitElement

			if (id === 2) {
				setQueue(message.waitElement)
				id++
				return
			}
			id++
		})

		const interval = setInterval(() => {
			setQueue(element)
		}, 7000)

		return () => {
			clearInterval(interval)
			socket.disconnect()
		}
	}, [])

	useEffect(() => {
		if (id === 49 || !status || queueWait !== 0) return

		const interval = setInterval(() => {
			setList((prev: Type[]) => {
				const template = templates[id++]

				if (!template || !template.title) {
					return prev
				}

				setScanTemplate(prev => prev + 1)
				return [template, ...prev].slice(0, 5)
			})
		}, 2000)

		return () => {
			clearInterval(interval)
		}
	}, [])

	return (
		<>
			<Modals modal={modal} setModal={setModal} status={status} />
			<div className="w-[27rem] rounded-lg p-5 relative max-md:w-full max-md:p-0 max-lg:w-1/2 max-md:mt-10 max-md:px-2">
				<div className="flex gap-3 bg-darknesPrimaryColor py-3 px-5 w-fit rounded-2xl absolute -top-[4rem] -left-[6rem] z-20 max-lg:py-2 max-lg:px-3 max-lg:-top-[2rem] max-md:-left-2 max-md:-top-12">
					<span className="material-symbols-outlined bg-primaryColor w-12 h-12 flex items-center justify-center rounded-full">add</span>
					<div>
						<p className="text-xl tracking-wider max-md:text-lg">
							<CountUp start={queue} end={queueWait} duration={1.5} />
						</p>
						<p className="text-gray-300  max-md:text-sm">
							W kolejce{" "}
							<button className="underline" onClick={() => setModal(!modal)}>
								szablonów
							</button>
						</p>
					</div>
				</div>
				<div className="absolute -bottom-20 -right-12 bg-darknesPrimaryColor p-1 z-20 flex gap-2 items-center rounded-full px-2 pl-5 max-lg:-right-2 max-md:bottom-5  ">
					<p>Wspieramy:</p>
					<div className="flex  bg-boxColor px-1 rounded-full">
						<span className="material-symbols-outlined bg-borderColor w-8 h-8 flex items-center justify-center rounded-full m-1 text-primaryColor text-lg">api</span>
						<span className="material-symbols-outlined bg-borderColor w-8 h-8 flex items-center justify-center rounded-full m-1 text-primaryColor text-lg">data_object</span>
						<span className="material-symbols-outlined bg-borderColor w-8 h-8 flex items-center justify-center rounded-full m-1 text-primaryColor text-lg">code</span>
						<span className="material-symbols-outlined bg-borderColor w-8 h-8 flex items-center justify-center rounded-full m-1 text-primaryColor text-lg">vpn_key</span>
					</div>
				</div>
				<Image src={heroDecoration} alt="decoration element" className="absolute -top-5 left-[21.5rem] z-0 max-md:-top-[6rem]  max-md:left-[10rem]" />
				<div className="absolute inset-0 z-10 bg-boxColor rounded-lg border border-borderColor p-5 overflow-hidden max-lg:relative max-lg:w-full max-md:mb-20 max-md:mx-auto max-md:px-2">
					<div className="flex items-center gap-1 mt-2">
						<p className="">Ostatnie przeskanowane szablony</p>
						<p className="font-semibold">({scanTemplate})</p>
					</div>
					<div className="flex flex-col gap-[0.80rem] mt-4">
						{list.map((element, index) => (
							<motion.div
								key={`source1-${element.id}` || element.templateId}
								initial={{ opacity: 0, y: -50 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -50 }}
								transition={{ duration: 0.5 }}
								layout
								className={`flex items-center gap-3 bg-altBackgroundColor border border-borderColor py-3 px-5 rounded-2xl ${!element.title ? "hidden" : "block"}`}>
								<AnimatePresence>
									<div className="text-gray-300 w-full">
										<p>{element.title}</p>
										<div className="w-full flex items-center justify-between">
											<p className="font-semibold">{element.dateCreate}</p>
											<p className="font-semibold">{element.usage} użyć</p>
										</div>
									</div>
								</AnimatePresence>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</>
	)
}
