"use client"

import { Button } from "@nextui-org/button"
import recommendIcon from "../../../../../public/recomendIcon.svg"
import addIcon from "../../../../../public/addIcon.svg"
import Image from "next/image"
import { TemplatesProps } from "../../../interfaces/common"
import Cards from "@/components/client/cards/card"
import Link from "next/link"
import animateCards from "@/utils/animations/animateCards"
import { useEffect, useRef } from "react"
import popularIcon from "../../../../../public/popularIcon.svg"
import { motion } from "framer-motion"

interface TemplateListProps {
	loadTemplates: TemplatesProps[]
	loadTemplatesData: TemplatesProps[]
	loadTemplatesPopularData: TemplatesProps[]
}

export default function TemplateList({ loadTemplates, loadTemplatesData, loadTemplatesPopularData }: TemplateListProps) {
	const animation = useRef<HTMLDivElement>(null)

	useEffect(() => {
		animateCards(animation.current)
	}, [])

	return (
		<>
			<div className="">
				<div className="">
					<div className="flex items-center gap-3">
						<Image src={recommendIcon} alt="proponowane szablony - ikona" className="max-md:w-14 max-md:h-14 h-16 w-16" priority />
						<div className="">
							<h2 className="text-xl font-semibold max-md:text-lg">Polecane szablony</h2>
							<p className="text-text-color text-lg max-md:text-sm">Sprawdź dostepne polecane szablony</p>
						</div>
					</div>
					<div className="grid grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1 gap-10 max-lg:gap-5 mt-5">
						{loadTemplates.map(el => (
							<motion.div key={el.templateId} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ type: "spring", stiffness: 100, damping: 12, duration: 0.5, ease: "easeOut" }}>
								<Cards title={el.title} description={el.description} usageCount={el.usageCount} categories={el.categories} templateId={el.templateId} slugUrl={el.slugUrl} />
							</motion.div>
						))}
					</div>
					<div className="flex justify-center mt-5">
						<Link href="/search?sort=popularity">
							<Button className="bg-alt-background-color px-10 border-border-color rounded-lg cursor-pointer">Zobacz więcej</Button>
						</Link>
					</div>
				</div>
				<div className="mt-32">
					<div className="flex items-center gap-3">
						<Image src={popularIcon} alt="proponowane szablony - ikona" className="max-md:w-14 max-md:h-14 w-16 h-16" />
						<div className="">
							<h2 className="text-xl font-semibold max-md:text-lg">Popularne szablony</h2>
							<p className="text-text-color text-lg  max-md:text-sm">Najczęściej odwiedzane szablony discord</p>
						</div>
					</div>
					<div className="grid grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1 gap-10 max-lg:gap-5 mt-5">
						{loadTemplatesPopularData.map(el => (
							<motion.div key={el.templateId} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.5, ease: "easeOut" }}>
								<Cards title={el.title} description={el.description} usageCount={el.usageCount} categories={el.categories} templateId={el.templateId} slugUrl={el.slugUrl} />
							</motion.div>
						))}
					</div>
					<div className="flex justify-center mt-5">
						<Link href="/search?sort=createdAt">
							<Button className="bg-alt-background-color px-10 border-border-color rounded-lg cursor-pointer">Zobacz więcej</Button>
						</Link>
					</div>
				</div>
				<div className="mt-32">
					<div className="flex items-center gap-3">
						<Image src={addIcon} alt="proponowane szablony - ikona" className="max-md:w-14 max-md:h-14 w-16 h-16" />
						<div className="">
							<h2 className="text-xl font-semibold max-md:text-lg">Nowe szablony</h2>
							<p className="text-text-color text-lg  max-md:text-sm">Sprawdź dostepne nowe szablony</p>
						</div>
					</div>
					<div className="grid grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1 gap-10 max-lg:gap-5 mt-5">
						{loadTemplatesData.map(el => (
							<motion.div key={el.templateId} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.5, ease: "easeOut" }}>
								<Cards title={el.title} description={el.description} usageCount={el.usageCount} categories={el.categories} templateId={el.templateId} slugUrl={el.slugUrl} />
							</motion.div>
						))}
					</div>
					<div className="flex justify-center mt-5">
						<Link href="/search?sort=createdAt">
							<Button className="bg-alt-background-color px-10 border-border-color rounded-lg cursor-pointer">Zobacz więcej</Button>
						</Link>
					</div>
				</div>
			</div>
		</>
	)
}
