export enum TypeView {
	MAIN = "MAIN",
	CREATE = "CREATE",
	CHAT = "CHAT",
}

enum Status {
	OPEN = "OPEN",
	CLOSE = "CLOSE",
}

export enum TypePerrmision {
	ADMIN = "ADMIN",
	USER = "USER",
	SYSTEM = "SYSTEM",
}

export interface Message {
	id?: number
	content: string
	type: TypePerrmision
	author: string
	authorId: string
	createdAt: Date
	chatId: string
	tempId?: string
}

export interface Chat {
	id: string
	createdAt: Date
	updatedAt: Date
	subject: string
	description: string
	status: Status
	userId: string
	agent?: string
	message: Message[]
}
