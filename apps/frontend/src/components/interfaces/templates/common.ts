import { User } from "@/components/interfaces/common"

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

type TemplateCategoryKey = keyof typeof TemplateCategory

export interface BaseInforamtion {
	templateId: string
	title: string
	description: string
	categories: TemplateCategoryKey
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
	id: string
	link: string
	slugUrl: string
	categories: string
	createdAt: Date
	updatedAt: Date
	title: string
	familyId: string
	isLatest: boolean
	version: number
	sourceServerId?: string
	description?: string
	authorId?: string
	addingUserId?: string
	code?: string
	usageCount: number
	channelCount: number
	rolesCount: number
	categoriesCount: number
	visitHistory: VisitHistory[]
	author: User
	addingUser: User
}

export interface VisitHistory {
	id: number
	uuid: string
	slugUrl: string
	visitedAt: Date
}

export enum TemplateCategory {
	ALL = "Wszystkie",
	ROLEPLAY = "Roleplay",
	THEMATIC = "Tematyczne",
	ENGLISH = "Angielskie",
	SOCIAL = "Społeczny",
	NSFW = "NSFW",
	GROUPS_OF_PEOPLE = "Grupy-ludzi",
	GUILDS = "Gildie",
	MEMES = "Memy",
	SCAM = "Scam",
	ANIME = "Anime",
	GTA = "GTA",
	DEV = "Devowe",
	MINECRAFT = "Minecraft",
	GAMING = "Gamingowe",
	ADVERTISING = "Reklamowe",
	AI = "AI",
}
