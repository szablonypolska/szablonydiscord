import { Button } from "@nextui-org/button"
import recommendIcon from "../../../../../public/recomendIcon.svg"
import addIcon from "../../../../../public/addIcon.svg"
import Image from "next/image"
import { TemplatesProps } from "../../../interfaces/common"
import Cards from "@/components/client/templates/main/card"

interface TemplateListProps {
	loadTemplates: TemplatesProps[]
	loadTemplatesData: TemplatesProps[]
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
