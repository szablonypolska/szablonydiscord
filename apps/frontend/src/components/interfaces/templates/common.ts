export interface Channel {
	name: string
	type: number
	id: number
	nsfw: boolean
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
}
