export interface TemplatesProps {
	authorId: string
	categories: string
	slugUrl: string
	clickButtonUse?: number
	dateCreate: string
	description: string
	id: number
	link: string
	server?: string
	serverLink?: string
	templateId: string
	title: string
	usageCount: number
}

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

export interface Template {
	id: number
	templateId: string
	slugUrl: string
	link: string
	categories: string
	dateCreate: string
	dateCreateSystem: Date
	title: string
	description?: string
	usageCount: number
	clickButtonUse?: number
	authorId: string
}

export interface Notification {
	id: number
	type: "error" | "success" | "warning"
	title: string
	description: string
	userId: string
	dateAdd: string
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
	template: Template[]
	notification: Notification[]
}
