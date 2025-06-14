import { Button } from "@nextui-org/button"
import Link from "next/link"

interface CardProps {
	title: string
	description: string
	usageCount: number
	categories: string
	templateId: string
	slugUrl: string
}

export default function Cards({ title, description, usageCount, categories, templateId, slugUrl }: CardProps) {
	return (
		<div className="card flex flex-col bg-background border border-borderColor p-5 rounded-lg" key={templateId}>
			<h3 className="text-xl truncate w-11/12">{title}</h3>
			<p className="mt-3 text-textColor truncate w-11/12 ">{description}</p>
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
			<Link href={`/templates/${slugUrl}`}>
				<Button className="bg-primaryDark text-primaryLight w-full mt-5 rounded-lg">Pokaż szablon</Button>
			</Link>
		</div>
	)
}
