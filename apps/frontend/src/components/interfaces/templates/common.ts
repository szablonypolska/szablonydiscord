export interface Channel {
	name: string
	type: number
	id: number
}

export interface Roles {
	name: string
	color: number
	id: number
}

export interface DiscordTemplate {
	creator: {
		avatar: string
		id: string
		username: string
	}
	serialized_source_guild: {
		channels: Channel[]
		roles: Roles[]
	}
	usage_count: number
}

export interface BaseInforamtion {
	title: string
	description: string
	categories: string
	link: string
}
