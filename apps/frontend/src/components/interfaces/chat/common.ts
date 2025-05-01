export enum TypeView {
	MAIN = "MAIN",
	CREATE = "CREATE",
	CHAT = "CHAT",
}

enum Status {
	OPEN = "OPEN",
	CLOSE = "CLOSE",
}

export interface Message {
	content: string
	type: TypeView
	author: string
	authorId: string
	chatId: string
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
