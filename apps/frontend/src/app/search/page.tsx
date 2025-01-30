import Navbar from "@/components/client/navbar"
import decorationElement from "../../../public/templatesDecoration.svg"
import Image from "next/image"
import Footer from "@/components/client/footer"
import { prisma } from "@repo/db"
import Search from "@/components/client/search/search"
import SearchCategories from "@/components/client/search/searchCategories"
import SearchTemplate from "@/components/client/search/serachTemplates"
import { TypeCategory } from "@/components/interfaces/search/common"
import getTemplateByCategory from "../../lib/search/by/getTemplateCategory"
import getTemplateBySort from "../../lib/search/by/getTemplateBySort"
import getTemplateByDefault from "@/lib/search/by/getTemplateDefault"
import getTemplateByName from "@/lib/search/by/getTemplateByName"
import { Template } from "@/components/interfaces/common"

interface Type {
	searchParams: {
		category: string
		sort: string
		page: string
		name: string
	}
}

interface TypeTemplates {
	templates: Template[]
	count: number
}

export default async function SearchTemplates({ searchParams }: Type) {
	const params = await searchParams
	const page = parseInt(params.page) || 1
	const take = 6
	const skip = (page - 1) * take
	let templates: TypeTemplates = { templates: [], count: 0 }

	const groupBy: TypeCategory[] = await prisma.templates.groupBy({
		by: ["categories"],
		_count: { categories: true },
	})

	if (params.category) templates = await getTemplateByCategory(skip, take)

	if (params.sort === "popularity") templates = await getTemplateBySort(skip, take, "usageCount")

	if (params.sort === "createdAt") templates = await getTemplateBySort(skip, take, "dateCreateSystem")

	if (params.name) templates = await getTemplateByName(params.name)

	if (!params.sort && !params.name && !params.category) templates = await getTemplateByDefault(skip, take)

	return (
		<>
			<div className="max-w-screen-2xl mx-auto w-full py-4 p-2">
				<Image src={decorationElement} alt="dekoracyjny element" className="absolute top-0 left-0" />
				<Navbar />
				<div className="max-w-screen-xl mx-auto w-full py-4 p-2 my-20">
					<Search />
					<div className="flex items-start gap-5 mt-8 max-lg:flex-col">
						<SearchCategories categories={groupBy} />
						<SearchTemplate templates={templates} />
					</div>
				</div>
			</div>
			<Footer />
		</>
	)
}
