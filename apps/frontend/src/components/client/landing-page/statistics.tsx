"use client"

import { Button } from "@nextui-org/button"
import Image from "next/image"
import decorationBox from "../../../../public/decorationElementBox.svg"
import { useInView } from "react-intersection-observer"
import CountUp from "react-countup"

interface Type {
	iconName: string
	description: string
}

function StatisticsCard({ iconName, description }: Type) {
	return (
		<div className="flex flex-col items-center bg-box-color border border-border-color py-5 px-12 rounded-lg w-1/2 z-10 max-xl:px-8 max-lg:px-4">
			<div className="p-2 rounded-full w-fit bg-darkTealFade z-0 relative">
				<div className="bg-darkTealFade   rounded-full w-10 h-10 relative z-10">
					<span className="material-symbols-outlined absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary-color text-3xl">
						{iconName}
					</span>
				</div>
			</div>
			<p className="mt-5 text-center">{description}</p>
		</div>
	)
}

export default function Statistics() {
	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.6,
	})

	return (
		<div className="max-md:w-full" ref={ref}>
			<h2 className="text-3xl max-md:text-center">
				Statystyki <strong className="text-primary-color">systemów</strong>
			</h2>
			<p className="text-text-color mt-2 max-md:text-center">
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim inventore voluptate voluptates quia at similique?
			</p>
			<div className="flex gap-20 max-xl:gap-10 w-full mt-5 max-lg:flex-col max-lg:items-center max-lg:justify-center">
				<div className="w-1/2 bg-alt-background-color p-10 px-14 max-xl:px-5 max-lg:px-2 rounded-xl relative max-lg:w-full max-md:py-5">
					<Image src={decorationBox} alt="element dekoracyjny" className="absolute right-0 top-0 z-0" />
					<div className="flex gap-10 max-xl:gap-5 max-md:gap-2">
						<StatisticsCard iconName="local_police" description="Stawiamy na bezpieczeństwo" />
						<StatisticsCard iconName="database" description="Ogromna baza szablonów discord" />
					</div>
					<div className="flex gap-10 mt-5 max-xl:gap-5 max-md:gap-2">
						<StatisticsCard iconName="new_releases" description="Ciągłe nowe aktualizacje strony" />
						<StatisticsCard iconName="dns" description="Zaawansowane systemy skanowania" />
					</div>
				</div>
				<div className="mt-3 w-1/2 max-lg:text-center max-lg:w-full max-lg:flex max-lg:flex-col max-lg:items-center">
					<p className="mt-4 text-2xl">Dla użytkowników</p>
					<p className="mt-2 text-text-color">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat magni tenetur praesentium autem minus,
						deserunt libero ex consequuntur sunt voluptas voluptatibus facere, deleniti magnam illum rerum nihil rem
						quidem odit.
					</p>
					<div className="flex gap-10 h-28 mt-10 max-md:flex-col max-md:h-fit max-md:items-center max-md:w-full">
						<div className="">
							<p className="text-4xl text-primary-color font-semibold">
								{inView && <CountUp start={0} end={2000} duration={2} />}
							</p>
							<p className="text-text-color mt-3 w-40">Szablonów serwerów discord</p>
						</div>

						<div className="w-0.5 h-full border-r border-dashed border-border-color max-md:w-10/12 max-md:h-1 max-md:border-b  "></div>

						<div className="">
							<p className="text-4xl text-primary-color font-semibold">
								{inView && <CountUp start={0} end={2215} duration={2} />}
							</p>
							<p className="text-text-color mt-3 w-40">Użykowników dodających szablony</p>
						</div>

						<div className="w-0.5 h-full border-r border-dashed border-border-color max-md:w-10/12 max-md:h-1 max-md:border-b"></div>

						<div className="">
							<p className="text-4xl text-primary-color font-semibold">
								{inView && <CountUp start={0} end={300} duration={2} />}
							</p>
							<p className="text-text-color mt-3 w-40">Cykli skanowania szablonów</p>
						</div>
					</div>
					<Button className="bg-alt-background-color border border-border-color rounded-full p-6 mt-12 flex items-center justify-center">
						Czytaj więcej
					</Button>
				</div>
			</div>
		</div>
	)
}
