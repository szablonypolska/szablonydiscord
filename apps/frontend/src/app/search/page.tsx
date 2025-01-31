import Navbar from "@/components/client/navbar"
import decorationElement from "../../../public/templatesDecoration.svg"
import Image from "next/image"
import Footer from "@/components/client/footer"
import { prisma } from "@repo/db"
import Search from "@/components/client/search/search"
import SearchCategories from "@/components/client/search/searchCategories"
import { TypeCategory } from "@/components/interfaces/search/common"
import { Suspense } from "react"
import { TypeSearchParams } from "@/components/interfaces/search/common"
import AsyncSearchTemplate from "@/components/server/search/asyncSearchTemplate"
import SearchTemplatesLoadingSkeleton from "@/components/client/search/loading/searchTemplatesLoadingSkeleton"

export default async function SearchTemplates({ searchParams }: TypeSearchParams) {
	const params = await searchParams

	const groupBy: TypeCategory[] = await prisma.templates.groupBy({
		by: ["categories"],
		_count: { categories: true },
	})

	return (
		<>
			<div className="max-w-screen-2xl mx-auto w-full py-4 p-2">
				<Image src={decorationElement} alt="dekoracyjny element" className="absolute top-0 left-0" />
				<Navbar />
				<div className="max-w-screen-xl mx-auto w-full py-4 p-2 my-20">
					<Search />
					<div className="flex items-start gap-5 mt-8 max-lg:flex-col">
						<SearchCategories categories={groupBy} />
						<Suspense fallback={<SearchTemplatesLoadingSkeleton />}>
							<AsyncSearchTemplate searchParams={params} />
						</Suspense>
					</div>
				</div>
			</div>
			<Footer />
		</>
	)
}
