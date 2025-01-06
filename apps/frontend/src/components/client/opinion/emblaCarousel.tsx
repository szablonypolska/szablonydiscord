"use client"

import React, { useCallback, useEffect, useState } from "react"
import { EmblaOptionsType } from "embla-carousel"
import { PrevButton, NextButton, usePrevNextButtons } from "./emblaCarouselArrowButtons"
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import icon from "../../../../public/Icon.svg"
import { Button } from "@nextui-org/button"

type PropType = {
	slides: number[]
	options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = props => {
	const { slides, options } = props
	const [emblaRef, emblaApi] = useEmblaCarousel({ ...options, align: "center", loop: false })
	const [selectedIndex, setSelectedIndex] = useState(Math.floor(slides.length / 2))

	const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi)

	const onSelect = useCallback(() => {
		if (!emblaApi) return
		setSelectedIndex(emblaApi.selectedScrollSnap())
	}, [emblaApi])

	useEffect(() => {
		if (!emblaApi) return
		emblaApi.scrollTo(Math.floor(slides.length / 2))
		emblaApi.on("select", onSelect)
		onSelect()
	}, [emblaApi, onSelect, slides.length])

	return (
		<section className="w-full mx-auto relative mt-20">
			<div className="flex justify-between items-center">
				<div className="">
					<h2 className="text-3xl text-primaryColor font-semibold">Opinie naszej strony</h2>
					<p className=" text-textColor mt-2">
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui porro quo eius aliquid ratione pariatur?
					</p>
				</div>
				<Button className="px-6 py-2 rounded-full bg-primaryColor">Dodaj opinię</Button>
			</div>
			<div className="overflow-hidden w-11/12 mx-auto mt-2 px-2  max-md:px-0" ref={emblaRef}>
				<div className="relative flex w-full">
					{slides.map((_, index) => {
						const isActive = index === selectedIndex
						const lastItem = index === slides.length - 1

						return (
							<div
								key={index}
								className={`flex-[0_0_80%]  lg:flex-[0_0_40%] max-md:flex-[0_0_100%]    transition-all duration-500 relative  pr-2 ${
									isActive ? "opacity-100  scale-100 z-20" : "opacity-50 scale-90 z-10 "
								} ${lastItem ? "mr-16 max-md:mr-0" : ""}`}>
								<div className="relative p-5   rounded-lg overflow-hidden">
									<div className="flex items-center gap-1">
										<div className="flex-grow h-0.5 bg-borderColor"></div>
										<Image src={icon} alt="ikona opinii" />
										<div className="flex-grow h-0.5 bg-borderColor"></div>
									</div>
									<div className="mt-5">
										<p className="text-center text-gray-300">
											Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus dicta aspernatur possimus
											incidunt quos, eligendi repellendus voluptates reprehenderit aut iure at consequatur debitis
											facere a commodi dolor voluptatem enim maxime illo! Enim sunt libero autem quidem minus
											cupiditate, quam vero esse sapiente qui voluptatum consequatur est aliquid nam corrupti porro
											perferendis adipisci sequi facere cum omnis. Odio vel qui modi?
										</p>
										<p className="mt-5 text-center text-primaryColor font-semibold">TheProShizer</p>
									</div>
								</div>
							</div>
						)
					})}
				</div>
			</div>
			<div className="absolute top-1/2 -translate-y-1/2 left-0">
				<Button
					className="flex justify-center text-primaryColor bg-altBackgroundColor w-12 h-12 rounded-full material-symbols-outlined disabled:text-gray-300"
					onPress={onPrevButtonClick}
					disabled={prevBtnDisabled}>
					arrow_back
				</Button>
			</div>
			<div className="absolute top-1/2 -translate-y-1/2 right-0">
				<Button
					className="flex justify-center text-primaryColor bg-altBackgroundColor w-12 h-12 rounded-full material-symbols-outlined disabled:text-gray-300"
					onPress={onNextButtonClick}
					disabled={nextBtnDisabled}>
					arrow_forward
				</Button>
			</div>
		</section>
	)
}

export default EmblaCarousel
