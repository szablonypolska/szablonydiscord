"use client"

import { Button } from "@nextui-org/button"
import { UserSettings } from "@/components/interfaces/common"
import { Hash, Users } from "lucide-react"
import Link from "next/link"
import { Template } from "@/components/interfaces/templates/common"

export default function Cards({ data, settingsData }: { data: Template; settingsData: UserSettings | null }) {
	return (
		<div className="card flex flex-col bg-background border border-border-color p-5 rounded-lg" key={data.templateId}>
			<h3 className="text-xl truncate w-11/12">{data.title}</h3>
			<p className="mt-3 text-text-color truncate w-11/12 ">{data.description}</p>
			<div className="grow"></div>

			{settingsData && settingsData.templatesDetail && (
				<div className="flex gap-4 mt-3">
					<div className="flex items-center gap-1 text-sm bg-alt-background-color border border-border-color px-2 py-1 rounded-md">
						<Hash size={16} className="text-text-color" />
						<span>{data.channelsCount} kanałów</span>
					</div>
					<div className="flex items-center gap-1 text-sm bg-alt-background-color border border-border-color px-2 py-1 rounded-md">
						<Users size={16} className="text-text-color" />
						<span>{data.categoriesCount} kategorii</span>
					</div>
					<div className="flex items-center gap-1 text-sm bg-alt-background-color border border-border-color px-2 py-1 rounded-md">
						<Users size={16} className="text-text-color" />
						<span>{data.rolesCount} ról</span>
					</div>
				</div>
			)}

			<div className="flex items-center w-full bg-alt-background-color border border-border-color mt-5 px-4 rounded-lg h-14">
				<div className="w-1/2 flex justify-between gap-1 pr-5  max-md:pr-5 max-lg:pr-2">
					<p>Ilość użyć:</p>
					<p className="text-text-color">{data.usageCount}</p>
				</div>
				<div className="w-px h-full bg-border-color"></div>
				<div className="w-1/2 flex justify-between gap-1 pl-5  max-md:pr-5 max-lg:pl-2">
					<p>Kategoria:</p>
					<p className="text-text-color max-w-1/2 truncate">{data.categories}</p>
				</div>
			</div>
			<Link href={`/templates/${data.slugUrl}`}>
				<Button className="bg-primary-dark text-primary-light w-full mt-5 rounded-lg cursor-pointer">Pokaż szablon</Button>
			</Link>
		</div>
	)
}
