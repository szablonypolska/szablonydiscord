export type BuilderStatus = "waiting" | "in_progress" | "done" | "error"
export type ViewType = "rules" | "tariff" | "privacyPolicy" | "faq"
export type CurrentPreviewType = "template" | "code"

export enum BuilderProcessStatus {
	WAITING = "WAITING",
	IN_PROGRESS = "IN_PROGRESS",
	COMPLETED = "COMPLETED",
	FAILED = "FAILED",
}

export enum BuilderStageType {
	ANALYSIS = "ANALYSIS",
	AUTHENTICATION = "AUTHENTICATION",
	CONFIGURE_SERVER = "CONFIGURE_SERVER",
	ROLES = "ROLES_CREATE",
	CATEGORY = "CATEGORIES_CREATE",
	CHANNEL = "CHANNELS_CREATE",
}

export type BuilderWebsocketType = "status_updated" | "code_updated" | "analysis_completed" | "roles_created" | "categories_created" | "channels_created" | "materials_updated"

export interface Builder {
	sessionId: string
	templateCode?: string | null
	templateUrl?: string | null
	userId: string
	title?: string | null
	description?: string | null

	sourceTemplate: string | null

	user: User
	builderProcess?: BuilderProcess
	materials?: Materials
	metrics?: BuilderMetrics
}

export interface User {
	userId: string
	name: string
	email: string
	image?: string | null
	role?: string | null
}

export interface Materials {
	rules: string
	tariff: string
	privacyPolicy: string
	faq: string
}

export interface BuilderMetrics {
	totalCategories: number
	totalChannels: number
	totalRoles: number
}

export interface BuilderProcess {
	id: number
	sessionId: string
	builder: Builder
	overallStatus: BuilderProcessStatus
	startedAt: Date
	finishedAt?: Date | null
	stages: BuilderStage[]
}

export interface BuilderStage {
	id: number
	processId: number
	type: BuilderStageType
	status: BuilderProcessStatus
	hasError: boolean
	code: string
	startedAt?: Date
	finishedAt?: Date | null
	category?: CategoryStage | null
	channel?: ChannelStage | null
	role?: RoleStage | null
}

export interface CategoryStage {
	id: number
	builderStageId: number
	category: Category[]
	builderStage: BuilderStage
}

export interface ChannelStage {
	id: number
	builderStageId: number
	channel: Channel[]
	builderStage: BuilderStage
}

export interface RoleStage {
	id: number
	builderStageId: number
	role: Role[]
	builderStage: BuilderStage
}

export interface Category {
	id: string
	stageId: number
	name: string
	type: number
	parentId: string
	position: number
	private: boolean
}

export interface Channel {
	id: string
	stageId: number
	name: string
	type: number
	parentId: string
	position: number
	private: boolean
}

export interface Role {
	id: number
	stageId: number
	name: string
	color: string
}

export interface PopupProps {
	position: number
	waitingInQueue: number
}

export interface Decoration {
	id: number
	style: string
}
