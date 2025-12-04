"use client"

import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { useCallback, useState, useEffect } from "react"
import { Template } from "@/components/interfaces/templates/common"
import Cards from "@/components/client/cards/card"
import { ArrowLeft, ArrowRight, TrendingUp } from "lucide-react"
import Link from "next/link"

export function LatestTemplatesSection({ templates }: { templates: Template[] }) {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", skipSnaps: false, slidesToScroll: 1 }, [Autoplay({ delay: 5000, stopOnInteraction: true })])
	const [selectedIndex, setSelectedIndex] = useState(0)

	const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])
	const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])

	useEffect(() => {
		if (!emblaApi) return

		const onSelect = () => {
			const scrollSnap = emblaApi.selectedScrollSnap()
			setSelectedIndex(Math.floor(scrollSnap / 4))
		}

		emblaApi.on("select", onSelect)

		return () => {
			emblaApi.off("select", onSelect)
		}
	}, [emblaApi])

	const totalDots = Math.ceil(templates.length / 4)

	return (
		<div className="my-32">
			<div className="flex items-center justify-between mb-8 max-md:flex-col max-md:gap-4">
				<div className="relative">
					<div className="flex items-center gap-3 bg-box-color border border-border-color px-4 py-1.5 rounded-full w-fit">
						<TrendingUp className="text-primary-color w-5.5 h-5.5" />
						<p className="text-sm">Popularne szablony</p>
					</div>
					<div className="absolute right-62 w-8 h-8 bg-primary-color blur-3xl "></div>
					<h2 className="font-bold text-[32px] mt-3">
						Odkryj najnowsze <span className="text-primary-color">szablony</span>
					</h2>
					<p className="text-text-color">Przeglądaj najczęściej używane i najnowsze szablony dla Twojego serwera Discord</p>
				</div>
				<div className="flex items-center gap-3">
					<button className="bg-box-color p-3 rounded-full border border-border-color text-text-color cursor-pointer hover:bg-border-color transition" onClick={scrollPrev}>
						<ArrowLeft />
					</button>
					<button className="bg-box-color p-3 rounded-full border border-border-color text-text-color cursor-pointer hover:bg-border-color transition" onClick={scrollNext}>
						<ArrowRight />
					</button>
				</div>
			</div>

			<div className="overflow-hidden" ref={emblaRef}>
				<div className="flex items-center gap-5">
					{templates.map(template => (
						<Cards key={template.slugUrl} data={template} className="min-w-[26rem] " />
					))}
				</div>
			</div>

			<div className="relative">
				<div className="absolute left-1/2 translate-x-20 w-8 h-8 bg-primary-color blur-3xl  "></div>
				<div className="flex items-center justify-center gap-2 mt-6">
					{Array.from({ length: totalDots }).map((_, index) => (
						<div key={index} className={`h-1 rounded-full transition-all ${index === selectedIndex ? "bg-primary-color w-8" : "bg-border-color w-6"}`} />
					))}
				</div>
				<div className="flex items-center justify-center gap-2 mt-8">
					<Link href="/templates" className="bg-box-color border border-border-color px-6 py-2 rounded-full">
						Zobacz więcej szablonów
					</Link>
				</div>
			</div>
		</div>
	)
}
