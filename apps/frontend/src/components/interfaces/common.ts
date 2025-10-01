import { Template } from "./templates/common"

interface ApiKey {
	id: number
	apiKeyId: string
	secretKey: string
	name: string
	dateCreate: Date
	status: boolean
	reqCount: number
	successCount: number
	errorCount: number
	lastUsed?: Date | undefined
	monthlyCount: number
	monthlyLimit: number
	dailyCount: number
	dailyLimit: number
	userId: string
}

export interface Notification {
	id: number
	type: "error" | "success" | "warning"
	title: string
	description: string
	userId: string
	dateAdd: string
}

export interface UserSettings {
	id: number
	userId: string
	templatesDetail: boolean
	monitoring: boolean
}

export interface User {
	avatar: string
	username: string
	dateCreateAccount: Date
	slugUrl: string
	emailVerified: boolean
	id: number
	limitApiKey: number
	register: boolean
	reports: boolean
	trustScore: number
	userId: string
	warnings: number
	status?: boolean
	api: ApiKey[]
	authorTemplates: Template[]
	notification: Notification[]
	settings: UserSettings
}
