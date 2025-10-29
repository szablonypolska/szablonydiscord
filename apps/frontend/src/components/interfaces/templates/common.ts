export interface Channel {
	name: string
	type: number
	id: string
	nsfw?: boolean
	parentId: string
	position: number
	private: boolean
	permission_overwrites?: Permission[]
}

export interface Roles {
	name: string
	color: number
	id: number
}

export interface Permission {
	id: number
	type: number
	allow: string
	deny: string
}

export interface DiscordTemplate {
	creator: {
		avatar: string
		id: string
		username: string
	}
	serialized_source_guild: {
		name: string
		channels: Channel[]
		roles: Roles[]
	}
	usage_count: number
	created_at: Date
}

export interface BaseInforamtion {
	templateId: string
	title: string
	description: string
	categories: string
	link: string
	slugUrl: string
	historyLength: number
	code?: string
	addingUser: {
		avatar: string
		username: string
		userId: string
	}
	author: {
		avatar: string
		username: string
		userId: string
	}
}

export interface Template {
	id: number
	templateId: string
	slugUrl: string
	link: string
	categories: string
	createdAt: Date
	updatedAt: Date
	title: string
	description?: string
	usageCount: number
	rolesCount: number
	categoriesCount: number
	channelsCount: number
	clickButtonUse?: number
	authorId: string
	visitHistory: HistoryVisitTemplate[]
}

export interface HistoryVisitTemplate {
	id: number
	uuid: string
	slugUrl: string
	createdAt: Date
}
