import { Template } from "@/components/interfaces/templates/common"
import getTemplateByName from "@/lib/search/by/getTemplateByName"
import getTemplateBySort from "@/lib/search/by/getTemplateBySort"
import getTemplateByCategory from "@/lib/search/by/getTemplateCategory"
import getTemplateByDefault from "@/lib/search/by/getTemplateDefault"
import { TypeSearchParams } from "@/components/interfaces/search/common"
import SearchTemplate from "@/components/client/search/serachTemplates"

interface TypeTemplates {
	templates: Template[]
	count: number
	type?: string
}

interface Props {
	params: TypeSearchParams
}

export default async function AsyncSearchTemplate({ params }: Props) {
	let templates: TypeTemplates = { templates: [], count: 0 }

	const page = parseInt(params.page || "1")
	const take = 6
	const skip = (page - 1) * take

	if (params.category) templates = await getTemplateByCategory(skip, take, params.category)

	if (params.sort === "popularity") templates = await getTemplateBySort(skip, take, "usageCount")

	if (params.sort === "createdAt") templates = await getTemplateBySort(skip, take, "createdAt")

	if (params.name) templates = await getTemplateByName(params.name)

	if (!params.sort && !params.name && !params.category) templates = await getTemplateByDefault(skip, take)

	if (templates.type === "search") templates = { ...templates, templates: templates.templates.slice(skip, skip + take) }

	return <SearchTemplate templates={templates} />
}
