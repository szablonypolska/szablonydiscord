import { Button } from "@nextui-org/button"
import recommendIcon from "../../../../../public/recomendIcon.svg"
import addIcon from "../../../../../public/addIcon.svg"
import Image from "next/image"
import { TemplatesProps } from "../../../interfaces/common"
import Link from "next/link"

interface TemplateListProps {
	loadTemplates: TemplatesProps[]
	loadTemplatesData: TemplatesProps[]
}

interface CardProps {
	title: string
	description: string
	usageCount: number
	categories: string
	templateId: string
}

function Cards({ title, description, usageCount, categories, templateId }: CardProps) {
	return (
		<div className="flex flex-col bg-background border border-borderColor p-5 rounded-lg">
			<h3 className="text-xl">{title}</h3>
			<p className="mt-3 text-textColor">{description}</p>
			<div className="flex-grow"></div>
			<div className="flex items-center w-full bg-altBackgroundColor border border-borderColor mt-5 px-4 rounded-lg h-14">
				<div className="w-1/2 flex justify-between gap-1 pr-5  max-md:pr-5 max-lg:pr-2">
					<p>Ilość użyć:</p>
					<p className="text-textColor">{usageCount}</p>
				</div>
				<div className="w-[1px] h-full bg-borderColor"></div>
				<div className="w-1/2 flex justify-between gap-1 pl-5  max-md:pr-5 max-lg:pl-2">
					<p>Kategoria:</p>
					<p className="text-textColor max-w-1/2 truncate">{categories}</p>
				</div>
			</div>
			<Button className="bg-[#0C3532] text-[#31E2D3] w-full mt-5 rounded-lg">
				<Link href={`/templates/${templateId}`}>Pokaż szablon</Link>
			</Button>
		</div>
	)
}

export default function TemplateList({ loadTemplates, loadTemplatesData }: TemplateListProps) {
	return (
		<>
			<div className="">
				<div className="">
					<div className="flex items-center gap-3">
						<Image src={recommendIcon} alt="proponowane szablony - ikona" priority />
						<div className="">
							<h2 className="text-2xl font-semibold">Polecane szablony</h2>
							<p className="text-textColor text-xl">Sprawdź dostepne polecane szablony</p>
						</div>
					</div>
					<div className="grid grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1 gap-10 max-lg:gap-5 mt-5">
						{loadTemplates.map((el, index) => (
							<Cards key={el.in} title={el.title} description={el.description} usageCount={el.usageCount} categories={el.categories} templateId={el.templateId} />
						))}
					</div>
					<div className="flex justify-center mt-5">
						<Button className="bg-altBackgroundColor px-10 border-borderColor rounded-lg">Zobacz więcej</Button>
					</div>
				</div>
				<div className="mt-32">
					<div className="flex items-center gap-3">
						<Image src={addIcon} alt="proponowane szablony - ikona" />
						<div className="">
							<h2 className="text-2xl font-semibold">Nowe szablony</h2>
							<p className="text-textColor text-xl">Sprawdź dostepne nowe szablony</p>
						</div>
					</div>
					<div className="grid grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1 gap-10 max-lg:gap-5 mt-5">
						{loadTemplatesData.map((el, index) => (
							<Cards key={el.in} title={el.title} description={el.description} usageCount={el.usageCount} categories={el.categories} templateId={el.templateId} />
						))}
					</div>
					<div className="flex justify-center mt-5">
						<Button className="bg-altBackgroundColor px-10 border-borderColor rounded-lg">Zobacz więcej</Button>
					</div>
				</div>
			</div>
		</>
	)
}
