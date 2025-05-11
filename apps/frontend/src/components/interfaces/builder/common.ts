export type BuilderStatus = "waiting" | "in_progress" | "done" | "error"

export interface BuilderType {
	sessionId: string
	slugUrl?: string
	hasError: boolean
	rolesNumber: number
	categoryNumber: number
	channelNumber: number

	aiAnalysisStatus: BuilderStatus
	aiAnalysisProgress: number
	aiAnalysisError?: string

	configureServerStatus: BuilderStatus
	configureServerProgress: number
	configureError?: string

	rolesStatus: BuilderStatus
	rolesProgress: number
	rolesError?: string
	roles: Roles[]
}

export interface Roles {
	sessionId: string
	name: string
	color: string
}
