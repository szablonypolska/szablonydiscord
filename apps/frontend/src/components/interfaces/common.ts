export interface TemplatesProps {
	authorId: string
	categories: string
	clickButtonUse?: number
	dateCreate: string
	description: string
	in: number
	link: string
	server?: string
	serverLink?: string
	templateId: string
	title: string
	usageCount: number
}

export interface DiscordTemplate {
	creator: {
		avatar: string
		id: string
		username: string
	}
	serialized_source_guild: {
		channels: {
			name: string
			type: number
		}
		roles: {
			name: string
			color: number
		}
	}
	usage_count: number
}

export interface BaseInforamtion {
	title: string
	description: string
	categories: string
}
