"use client"

import Image from "next/image"
import decorationBox from "../../public/decorationElementBox.svg"

export default function Card() {
	return (
		<>
			<div className="max-md:w-full">
				<h2 className="text-3xl">
					Statystyki <strong className="text-primaryColor">skanowania</strong>
				</h2>
				<p className="text-gray-300 my-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, expedita.</p>
				<div className="flex items-center gap-8 bg-altBackgroundColor py-5 px-10 relative rounded-xl max-md:flex-col max-md:w-full max-md:px-5 max-md:gap-5">
					<Image src={decorationBox} alt="dekoracyjny element boksa" className="absolute top-0 right-0 z-10" />
					<div className="bg-boxColor py-5 px-10 border border-borderColor  rounded-2xl flex-grow z-20 max-md:w-full max-md:px-5">
						<h2 className="font-bold">Ostatnio przeskanowane szablony</h2>
						<p className="mt-3">Przeskanowane 500/500</p>
						<p>Kolejne skanowanie za: 23 godziny.</p>
					</div>
					<div className="bg-boxColor py-5 px-10 border border-borderColor  rounded-2xl flex-grow z-20 max-md:w-full max-md:px-5">
						<h2 className="font-bold">Ostatnio przeskanowani użytkownicy</h2>
						<p className="mt-3">Przeskanowane 500/500</p>
						<p>Kolejne skanowanie za: 23 godziny.</p>
					</div>
					<div className="bg-boxColor py-5 px-10 border border-borderColor  rounded-2xl flex-grow z-20 max-md:w-full max-md:px-5">
						<h2 className="font-bold">Statystyki wydajności skanowania</h2>
						<p className="mt-3">Przeskanowane 500/500</p>
						<p>Kolejne skanowanie za: 23 godziny.</p>
					</div>
				</div>
			</div>
		</>
	)
}
