import searchTemplatesDiscord from "../searchTemplate"

export default async function getTemplateByName(name: string) {
	const searchTemplate = await searchTemplatesDiscord(name)
	const numberPages = Math.ceil(searchTemplate.templates.length / 6)

	console.log(searchTemplate.templates, searchTemplate.templates.length)

	return { templates: searchTemplate.templates, count: numberPages || 0 }
}
