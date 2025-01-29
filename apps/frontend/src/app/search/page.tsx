import Navbar from "@/components/client/navbar"
import decorationElement from "../../../public/templatesDecoration.svg"
import Image from "next/image"
import Footer from "@/components/client/footer"
import { prisma } from "@repo/db"
import Search from "@/components/client/search/search"
import SearchCategories from "@/components/client/search/searchCategories"
import SearchTopBar from "@/components/client/search/searchTopBar"
import SearchTemplate from "@/components/client/search/serachTemplates"
import { TypeCategory } from "@/components/interfaces/search/common"

interface Type {
	searchParams: {
		category: string
		sort: string
		page: string
	}
}

export default async function SearchTemplates({ searchParams }: Type) {
	const params = await searchParams
	const page = parseInt(params.page) || 1
	const take = 6
	const skip = (page - 1) * take
	let templates = { templates: [], count: 0 }

	const groupBy: TypeCategory[] = await prisma.templates.groupBy({
		by: ["categories"],
		_count: {
			categories: true,
		},
	})

	if (params.category) {
		const searchCategory = groupBy.find(el => el.categories === params.category)
		const numberPages = Math.ceil((searchCategory?._count.categories || 0) / 6)
		const templateCategory = await prisma.templates.findMany({
			where: { categories: params.category },
			skip: skip,
			take: take,
		})

		templates = { templates: templateCategory, count: numberPages || 0 }
	}

	if (params.sort === "popularity") {
		const count = await prisma.templates.count()
		const numberPages = Math.ceil(count / 6)
		const templateSort = await prisma.templates.findMany({
			orderBy: {
				usageCount: "desc",
			},
			skip: skip,
			take: take,
		})
		templates = { templates: templateSort, count: numberPages || 0 }
	}
	if (params.sort === "createdAt") {
		const count = await prisma.templates.count()
		const numberPages = Math.ceil(count / 6)
		const templateSort = await prisma.templates.findMany({
			orderBy: {
				dateCreateSystem: "desc",
			},
			skip: skip,
			take: take,
		})
		templates = { templates: templateSort, count: numberPages || 0 }
	}

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
