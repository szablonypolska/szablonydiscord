import { DefaultSession } from "next-auth"

declare module "next-auth" {
	interface Profile {
		id?: string
		avatar: string
		username: string
	}

	interface Session {
		user: {
			id: string
		} & DefaultSession["user"]
	}
}
