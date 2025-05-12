export type BuilderStatus = "waiting" | "in_progress" | "done" | "error"

export interface BuilderType {
	sessionId: string
	slugUrl?: string
	hasError: boolean
	rolesNumber: number
	categoryNumber: number
	channelNumber: number

	aiAnalysisStatus: BuilderStatus
	aiAnalysisError?: string

	configureServerStatus: BuilderStatus
	configureError?: string

	rolesStatus: BuilderStatus
	rolesError?: string
	roles: Roles[]

	categoryStatus: BuilderStatus
	categoryError?: string
	category: Category[]
}

export interface Category {
	name: string
}

export interface Roles {
	name: string
	color: string
}
