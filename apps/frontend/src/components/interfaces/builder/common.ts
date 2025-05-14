export type BuilderStatus = "waiting" | "in_progress" | "done" | "error"

export interface BuilderType {
	sessionId: string
	slugUrl?: string
	hasError: boolean
	rolesNumber: number
	categoryNumber: number
	channelNumber: number

	aiAnalysisStatus: BuilderStatus
	aiAnalysisError: boolean

	configureServerStatus: BuilderStatus
	configureServerError: boolean

	rolesStatus: BuilderStatus
	rolesError: boolean
	roles: Roles[]

	categoryStatus: BuilderStatus
	categoryError: boolean
	category: Category[]

	channelStatus: string
	channelError: boolean
	channel: Channel[]
}

export interface Category {
	name: string
	type?: number
}

export interface Channel {
	name: string
	type?: number
}

export interface Roles {
	name: string
	color: string
}
