import { Button } from "@nextui-org/button"
import Link from "next/link"

interface CardProps {
	title: string
	description: string
	usageCount: number
	categories: string
	templateId: string
}

export default function CardProfile({ title, description, usageCount, categories, templateId }: CardProps) {
	return (
		<div className="flex flex-col  border border-borderColor rounded-xl overflow-hidden">
			<div className="bg-altBackgroundColor p-5">
				<p className="font-medium text-lg">{title}</p>
				<p className="text-silverColor mt-3">{description}</p>
			</div>
			<div className="flex items-center justify-between bg-background  p-5">
				<div className="flex items-center gap-3">
					<p>
						{usageCount} <span className="text-silverColor">użyć</span>
					</p>
					<p>{categories}</p>
				</div>
				<Link href={`/templates/${templateId}`}>
					<Button className="bg-primaryDark text-primaryLight px-5 rounded-full">Pokaż</Button>
				</Link>
			</div>
		</div>
	)
}
