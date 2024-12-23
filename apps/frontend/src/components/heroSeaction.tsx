"use client"

import heroDecoration from "../../public/decorationElementHero.svg"
import Image from "next/image"
import CountUp from "react-countup"
import { motion, AnimatePresence } from "framer-motion"
import useWebSocket from "@/hooks/useWebSocket"
import { useEffect, useState } from "react"
import { connectSocket } from "@/socket"
import LoadScanTemplate from "./server/loadScanTemplate"

export default function HeroSeaction() {
	const { message } = useWebSocket()

	// useEffect(() => {
	// 	if (message) {
	// 		setElement(prev => {
	// 			const updateArray = [message, ...prev]

	// 			if (updateArray.length > 5) {
	// 				return updateArray.slice(0, 5)
	// 			}

	// 			return updateArray
	// 		})
	// 	}
	// }, [message])

	useEffect(() => {
		const socket = connectSocket()

		socket.on("message", message => {
			console.log(message)
		})
	}, [])

	return (
		<>
			<header className="py-32 px-5 overflow-hidden max-lg:px-2 max-md:py-10 pr-12">
				<div className="flex gap-32 max-2xl:gap-10 max-md:flex-col max-md:items-center max-lg:gap-5">
					<div className="max-md:flex max-md:flex-col max-md:items-center max-md:text-center mb-10 max-md:w-full max-lg:w-1/2">
						<div className="flex items-center gap-2 bg-borderColor w-fit px-2 py-1 rounded-full">
							<span className="material-symbols-outlined text-primaryColor">verified</span>
							<p className="text-gray-300">Szablonydiscord jest w pełni bezpłatne</p>
						</div>
						<h2 className="text-4xl font-medium tracking-wide mt-5 max-md:text-2xl max-md:font-black max-lg:text-3xl">
							Witaj w SzablonyDiscord
						</h2>
						<h3 className="text-4xl font-medium tracking-wide max-md:mt-2 mt-5 max-md:text-2xl max-md:text-wrap max-lg:text-3xl">
							Zobacz jak wykorzystujemy <strong className="text-primaryColor font-semibold">swoje</strong>
						</h3>
						<h3 className="text-4xl tracking-wide mt-5 text-primaryColor font-semibold max-md:text-2xl max-md:mt-1 max-lg:text-3xl">
							zaawansowane systemy!
						</h3>
						<p className="my-7 w-[45rem] text-sm text-gray-300 max-xl:w-[35rem] max-md:text-xs max-lg:w-full max-md:my-4">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia necessitatibus, pariatur ratione minus
							exercitationem eaque omnis autem ipsum dolore excepturi. Tempora, corrupti saepe rem blanditiis
							exercitationem pariatur eos fugiat voluptates sit voluptate dolor quisquam accusantium. Ut aspernatur
							incidunt ducimus dolore.
						</p>
						<button className=" bg-primaryColor px-5 py-3 rounded-full">Zacznij przeglądać</button>
					</div>

					<div className="w-[27rem] rounded-lg p-5 relative max-md:w-full max-md:p-0 max-lg:w-1/2">
						<div className="flex gap-3 bg-darknesPrimaryColor py-3 px-5 w-fit rounded-2xl absolute -top-[4rem] -left-[6rem] z-20 max-lg:py-2 max-lg:px-3 max-lg:-top-[2rem]  max-md:hidden">
							<span className="material-symbols-outlined bg-primaryColor w-12 h-12 flex items-center justify-center rounded-full">
								add
							</span>
							<div>
								<p className="text-xl tracking-wider max-md:text-lg">
									<CountUp start={0} end={3500} duration={3} />
								</p>
								<p className="text-gray-300  max-md:text-sm">Szablonów discord</p>
							</div>
						</div>
						<div className="absolute -bottom-20 -right-12 bg-darknesPrimaryColor p-1 z-20 flex gap-2 items-center rounded-full px-2 pl-5 max-lg:-right-2 max-md:bottom-0 max-md:right-1/2 max-md:translate-x-1/2 max-lg:-bottom-10">
							<p>Wspieramy:</p>
							<div className="flex  bg-boxColor px-1 rounded-full">
								<span className="material-symbols-outlined bg-borderColor w-8 h-8 flex items-center justify-center rounded-full m-1 text-primaryColor text-lg">
									api
								</span>
								<span className="material-symbols-outlined bg-borderColor w-8 h-8 flex items-center justify-center rounded-full m-1 text-primaryColor text-lg">
									data_object
								</span>
								<span className="material-symbols-outlined bg-borderColor w-8 h-8 flex items-center justify-center rounded-full m-1 text-primaryColor text-lg">
									code
								</span>
								<span className="material-symbols-outlined bg-borderColor w-8 h-8 flex items-center justify-center rounded-full m-1 text-primaryColor text-lg">
									vpn_key
								</span>
							</div>
						</div>
						<Image
							src={heroDecoration}
							alt="decoration element"
							className="absolute -top-5 left-[21.5rem] z-0 max-md:-top-[6rem]  max-md:left-[10rem]"
						/>
						<LoadScanTemplate />
					</div>
				</div>
			</header>
		</>
	)
}
