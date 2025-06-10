export type BuilderStatus = "waiting" | "in_progress" | "done" | "error"
export type ViewType = "rules" | "tariff" | "privacyPolicy" | "faq"
export type CurrentPreviewType = "template" | "code"

export interface BuilderType {
	sessionId: string
	templateCode?: string
	templateUrl?: string
	hasError: boolean
	rolesNumber: number
	categoryNumber: number
	channelNumber: number
	title: string
	description: string
	rules: string
	tariff: string
	privacyPolicy: string
	faq: string
	code: string

	aiAnalysisStatus: BuilderStatus
	aiAnalysisError: boolean

	authenticationStatus: BuilderStatus
	authenticationError: boolean

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
	id: string
	name: string
	type: number
	position: number
	parentId: string
	private: false
}

export interface Channel {
	id: string
	name: string
	parentId: string
	position: number
	type?: number
	private: boolean
}

export interface Roles {
	name: string
	color: string
}

export interface Decoration {
	id: number
	style: string
}

