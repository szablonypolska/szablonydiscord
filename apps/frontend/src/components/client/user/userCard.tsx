import { Button } from "@nextui-org/button"
import Link from "next/link"

interface CardProps {
	title: string
	description: string
	usageCount: number
	categories: string
	slugUrl: string
}

export default function CardProfile({ title, description, usageCount, categories, slugUrl }: CardProps) {
	return (
		<div className="flex flex-col  border border-borderColor rounded-xl overflow-hidden">
			<div className="bg-altBackgroundColor p-5">
				<p className="font-medium text-lg w-11/12 truncate">{title}</p>
				<p className="text-silverColor mt-3 w-11/12 truncate">{description}</p>
			</div>
			<div className="flex items-center justify-between bg-background  p-5">
				<div className="flex items-center gap-3">
					<p>
						{usageCount} <span className="text-silverColor">użyć</span>
					</p>
					<p>{categories}</p>
				</div>
				<Link href={`/templates/${slugUrl}`}>
					<Button className="bg-primaryDark text-primaryLight px-5 rounded-full">Pokaż</Button>
				</Link>
			</div>
		</div>
	)
}
