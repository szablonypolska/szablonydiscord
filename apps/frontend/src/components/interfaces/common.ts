export interface TemplatesProps {
	authorId: string
	categories: string
	clickButtonUse?: number
	dateCreate: string
	description: string
	in: number
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
	in: number
	templateId: string
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

export interface User {
	avatar: string
	username: string
	dateCreateAccount: Date
	emailVerified: boolean
	id: number
	limitApiKey: number
	register: boolean
	reports: boolean
	trustScore: number
	userId: string
	warnings: number
	api: ApiKey[]
	template: Template[]
}

