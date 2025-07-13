"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import heroDecoration from "../../../../../public/decorationElementHero.svg"
import { Plus, ArrowBigUp, Database, Code, Key } from "lucide-react"
import Image from "next/image"
import CountUp from "react-countup"
import Modals from "./heroModal"
import { formatData } from "@/utils/formatedData"

interface Type {
	title: string
	id: number
	usageCount: number
	dateCreate: Date
	templateId: string
	waitElement?: number
}

interface Props {
	templates: Type[]
	status: boolean
}

export default function ScanTemplateList({ templates, status }: Props) {
	const [list, setList] = useState<Type[]>([])
	const [scanTemplate, setScanTemplate] = useState<number>(0)
	const [modal, setModal] = useState<boolean>(false)
	let id = 4

	useEffect(() => {
		setList(templates.slice(0, 4))
	}, [templates])

	useEffect(() => {
		if (id === 49 || !status) return

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
	}, [id, status, templates])

	return (
		<>
			<Modals modal={modal} setModal={setModal} status={status} />
			<div className="w-[27rem] rounded-lg p-5 relative max-md:w-full max-md:p-0 max-lg:w-1/2 max-md:mt-10 max-md:px-2">
				<motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.3 }} className="flex gap-3 bg-darknesPrimaryColor py-3 px-5 w-fit rounded-2xl absolute -top-[4rem] -left-[6rem] z-20 max-lg:py-2 max-lg:px-3 max-lg:-top-[2rem] max-md:-left-2 max-md:-top-12">
					<div className="w-12 h-12 bg-primaryColor flex items-center justify-center rounded-full">
						<Plus className=" " />
					</div>
					<div>
						<p className="text-xl tracking-wider max-md:text-lg">
							<CountUp start={10} end={100} duration={1.5} />
						</p>
						<p className="text-gray-300  max-md:text-sm">
							W kolejce{" "}
							<button className="underline" onClick={() => setModal(!modal)}>
								szablonów
							</button>
						</p>
					</div>
				</motion.div>
				<motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.3 }} className="absolute -bottom-20 -right-12 bg-darknesPrimaryColor p-1 z-20 flex gap-2 items-center rounded-full px-2 pl-5 max-lg:-right-2 max-md:bottom-5  ">
					<p>Wspieramy:</p>
					<div className="flex  bg-boxColor px-1 rounded-full">
						<div className="bg-borderColor w-8 h-8 flex items-center justify-center rounded-full m-1 text-primaryColor">
							<ArrowBigUp className="w-5 h-5" />
						</div>
						<div className="bg-borderColor w-8 h-8 flex items-center justify-center rounded-full m-1 text-primaryColor">
							<Database className="w-4 h-4" />
						</div>
						<div className="bg-borderColor w-8 h-8 flex items-center justify-center rounded-full m-1 text-primaryColor">
							<Code className="w-4 h-4" />
						</div>
						<div className="bg-borderColor w-8 h-8 flex items-center justify-center rounded-full m-1 text-primaryColor">
							<Key className="w-4 h-4" />
						</div>
					</div>
				</motion.div>
				<Image src={heroDecoration} alt="decoration element" className="absolute -top-5 left-[21.5rem] z-0 max-md:-top-[6rem]  max-md:left-[10rem]" />
				<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.3 }} className="absolute inset-0 z-10 bg-boxColor rounded-lg border border-borderColor p-5 overflow-hidden max-lg:relative max-lg:w-full max-md:mb-20 max-md:mx-auto max-md:px-2">
					<div className="flex items-center gap-1 mt-2">
						<p className="">Ostatnie przeskanowane szablony</p>
						<p className="font-semibold">({scanTemplate})</p>
					</div>
					<div className="flex flex-col gap-3 mt-4">
						{list.map(element => (
							<motion.div key={`source1-${element.templateId}` || element.templateId} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.5 }} layout className={`flex items-center gap-3 bg-altBackgroundColor border border-borderColor py-3 px-5 rounded-2xl  ${!element.title ? "hidden" : "block"}`}>
								<AnimatePresence>
									<div className="text-gray-300 w-full">
										<p className="truncate w-11/12">{element.title}</p>
										<div className="w-full flex items-center justify-between">
											<p className="font-semibold">{formatData(element.dateCreate)}</p>
											<p className="font-semibold">{element.usageCount} użyć</p>
										</div>
									</div>
								</AnimatePresence>
							</motion.div>
						))}
					</div>
				</motion.div>
			</div>
		</>
	)
}
