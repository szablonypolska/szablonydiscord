"use client"

import heroDecoration from "../../../../public/decorationElementHero.svg"
import Image from "next/image"
import CountUp from "react-countup"

export default function HeroContentElement() {
	return (
		<>
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
		</>
	)
}
